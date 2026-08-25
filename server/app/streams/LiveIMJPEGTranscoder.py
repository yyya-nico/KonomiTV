from __future__ import annotations

import asyncio
from typing import TYPE_CHECKING

from app import logging
from app.constants import LIBRARY_PATH


if TYPE_CHECKING:
    from app.streams.LiveStream import LiveStream


class LiveIMJPEGTranscoder:
    """エンコード済みライブ MPEG-TS から I フレーム由来の JPEG を生成する。"""

    def __init__(self, live_stream: LiveStream) -> None:
        """
        I-MJPEG 変換器を初期化する。

        Args:
            live_stream (LiveStream): 変換元のエンコード済み MPEG-TS を管理するライブストリーム

        Returns:
            None
        """

        # 変換元 MPEG-TS と、生成した JPEG の配信先を保持する LiveStream
        ## run() で FFmpeg の入出力を接続し、JPEG 完成時に writeIMJPEGFrame() を呼び出す
        self._live_stream = live_stream

        # LiveEncodingTask から受け取ったエンコード済み MPEG-TS を一時保持する Queue
        ## writeMPEGTSData() は同期メソッドなので、FFmpeg stdin への非同期書き込みは run() 内の Writer() が担当する
        self._mpegts_queue: asyncio.Queue[bytes | None] = asyncio.Queue()


    def writeMPEGTSData(self, stream_data: bytes) -> None:
        """
        変換対象のエンコード済み MPEG-TS を Queue に追加する。

        Args:
            stream_data (bytes): LiveEncodingTask が出力した MPEG-TS データ

        Returns:
            None
        """

        self._mpegts_queue.put_nowait(stream_data)


    async def run(self) -> None:
        """
        FFmpeg を起動し、エンコード済み映像の I フレームごとに JPEG を生成する。

        Args:
            なし

        Returns:
            None
        """

        # 入力側のフレームレートを変更せず、エンコード後 MPEG-TS のキーフレームだけをデコードする
        ## select でも pict_type=I を確認することで、非 I フレームが JPEG として出力されることを防ぐ
        ffmpeg_options = [
            '-f', 'mpegts',
            '-skip_frame', 'nokey',
            '-fflags', 'nobuffer',
            '-flags', 'low_delay',
            '-i', 'pipe:0',
            '-map', '0:v:0',
            '-an', '-sn', '-dn',
            '-vf', r'select=eq(pict_type\,I)',
            '-fps_mode', 'vfr',
            '-c:v', 'mjpeg',
            '-q:v', '7',
            '-f', 'image2pipe',
            'pipe:1',
        ]
        logging.info(
            f'{self._live_stream.log_prefix} I-MJPEG FFmpeg Commands:\n'
            f'ffmpeg {" ".join(ffmpeg_options)}'
        )

        # I-MJPEG クライアントが存在する間だけ、共有する変換用 FFmpeg を1プロセス起動する
        process = await asyncio.subprocess.create_subprocess_exec(
            LIBRARY_PATH['FFmpeg'],
            *ffmpeg_options,
            stdin = asyncio.subprocess.PIPE,
            stdout = asyncio.subprocess.PIPE,
            stderr = asyncio.subprocess.PIPE,
        )
        assert process.stdin is not None
        assert process.stdout is not None
        assert process.stderr is not None

        async def Writer() -> None:
            """Queue の MPEG-TS を FFmpeg の標準入力へ継続的に書き込む。"""

            try:
                while True:
                    stream_data = await self._mpegts_queue.get()
                    if stream_data is None:
                        break
                    process.stdin.write(stream_data)
                    await process.stdin.drain()
            except (BrokenPipeError, ConnectionResetError):
                pass
            finally:
                process.stdin.close()

        async def Reader() -> None:
            """FFmpeg の標準出力を JPEG の SOI・EOI 境界で分割して配信する。"""

            # image2pipe は可変長 JPEG を連結して出力するため、チャンク境界を信用せず JPEG マーカーで切り出す
            buffer = bytearray()
            while True:
                chunk = await process.stdout.read(65536)
                if chunk == b'':
                    break
                buffer.extend(chunk)

                # 1回の読み取りに複数 JPEG が含まれる場合も、得られた順にすべて配信する
                while True:
                    soi_position = buffer.find(b'\xff\xd8')
                    if soi_position == -1:
                        # SOI の先頭1バイトだけが次チャンクに分割された可能性を残す
                        if buffer.endswith(b'\xff'):
                            buffer[:] = b'\xff'
                        else:
                            buffer.clear()
                        break

                    # SOI より前の不要データを捨て、EOI が揃うまで次の読み取りを待つ
                    if soi_position > 0:
                        del buffer[:soi_position]
                    eoi_position = buffer.find(b'\xff\xd9', 2)
                    if eoi_position == -1:
                        break

                    jpeg_end_position = eoi_position + 2
                    self._live_stream.writeIMJPEGFrame(bytes(buffer[:jpeg_end_position]))
                    del buffer[:jpeg_end_position]

        async def ErrorReader() -> None:
            """パイプ詰まりを防ぐため FFmpeg の標準エラーを読み続ける。"""

            # 変換器は長時間動作するため、ログ全体ではなく異常終了時の調査に必要な末尾 64KB だけを保持する
            stderr_tail = bytearray()
            while True:
                stderr_chunk = await process.stderr.read(4096)
                if stderr_chunk == b'':
                    break
                stderr_tail.extend(stderr_chunk)
                if len(stderr_tail) > 65536:
                    del stderr_tail[:-65536]

            if process.returncode not in (None, 0) and stderr_tail != b'':
                logging.warning(
                    f'{self._live_stream.log_prefix} I-MJPEG FFmpeg exited unexpectedly:\n'
                    f'{stderr_tail.decode("utf-8", errors="replace").strip()}'
                )

        background_tasks = {
            asyncio.create_task(Writer()),
            asyncio.create_task(Reader()),
            asyncio.create_task(ErrorReader()),
        }
        try:
            # 通常は HTTP 接続がなくなるまで変換を続け、FFmpeg が先に終了した場合は残りの入出力タスクも終了する
            process_wait_task = asyncio.create_task(process.wait())
            await process_wait_task
        finally:
            # HTTP 切断などによるキャンセル時も FFmpeg を確実に回収する
            if process.returncode is None:
                process.kill()
            await process.wait()

            # FFmpeg 回収後はパイプを待っている入出力タスクもすべてキャンセルし、例外を回収する
            for background_task in background_tasks:
                background_task.cancel()
            await asyncio.gather(*background_tasks, return_exceptions=True)

        # キャンセルではなく FFmpeg 自体が終了した場合だけ、接続中クライアントへストリーム終了を通知する
        self._live_stream.finishIMJPEGStream()
