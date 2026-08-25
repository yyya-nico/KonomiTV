import './style.scss';

import mpegts from 'mpegts.js';

import type { ILiveChannel, ILiveChannelsList } from '@/services/Channels';

import Utils, { PlayerUtils } from '@/utils';

// 組み込みプレイヤーと同様の仕組みとして、再生開始前に確保する再生バッファ (秒単位)
// ネットワーク種別に応じて、通常で 1.5 秒、安定重視で 4 秒程度の遅延を許容する
const LIVE_PLAYBACK_BUFFER_SECONDS = 1.5;
const LIVE_PLAYBACK_BUFFER_SECONDS_STABLE = 4.0;

// UI制御クラス
class UIController {
    static readonly CHOICED_TILE = [
        [-1, -1, -1, 6],
        [-1, -1, -1, 5],
        [-1, -1, -1, 4],
        [0, 1, 2, 3],
        [7, 8, 9, 10]
    ];

    wrap: HTMLElement;
    chList: HTMLElement;
    control: HTMLElement;
    tileSplitBtn: HTMLButtonElement;
    keepDisplaySw: HTMLInputElement;
    fullscreenBtn: HTMLButtonElement;
    hideTimer: ReturnType<typeof setTimeout> | null;
    delayHideTimer: ReturnType<typeof setTimeout> | null;
    onTuning: (ch: number | 'up' | 'down') => void;
    onTileSplitClick: () => void;

    constructor(wrap: HTMLElement, chList: HTMLElement, control: HTMLElement,  tileSplitBtn: HTMLButtonElement, keepDisplaySw: HTMLInputElement, fullscreenBtn: HTMLButtonElement) {
        this.wrap = wrap;
        this.chList = chList;
        this.control = control;
        this.tileSplitBtn = tileSplitBtn;
        this.keepDisplaySw = keepDisplaySw;
        this.fullscreenBtn = fullscreenBtn;
        this.hideTimer = null;
        this.delayHideTimer = null;
        this.onTuning = () => {};
        this.onTileSplitClick = () => {};
    }

    init(): void {
        this.setupEventListeners();
        this.showAndHide();
    }

    setupEventListeners(): void {
        const showAndHide = () => this.showAndHide();
        window.addEventListener('pointerdown', showAndHide);
        window.addEventListener('pointermove', showAndHide);
        window.addEventListener('scroll', showAndHide);
        this.keepDisplaySw.addEventListener('change', showAndHide);

        window.addEventListener('keydown', (e: KeyboardEvent) => this.handleKeydown(e, showAndHide));

        this.tileSplitBtn.addEventListener('click', () => this.onTileSplitClick());

        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleKeydown(e: KeyboardEvent, showAndHide: () => void): void {
        const keyName = e.key;
        const activeElem = document.activeElement as HTMLElement;
        const activeChFrame = activeElem && activeElem.classList.contains('chframe');
        switch (keyName) {
            case 'D':
            case 'd':
                this.keepDisplaySw.click();
                this.keepDisplaySw.focus();
                break;
            case 'F':
            case 'f':
                this.fullscreenBtn.click();
                this.fullscreenBtn.focus();
                break;
            case 'V':
            case 'v':
                this.tileSplitBtn.click();
                this.tileSplitBtn.focus();
                break;
            case 'ArrowUp':
            case 'ArrowRight':
            case 'ArrowDown':
            case 'ArrowLeft':
                this.onDirectionalKey(keyName);
                break;
            case 'Enter':
            case ' ':
                if (activeChFrame) {
                    activeElem.click();
                }
                break;
            case 'R':
            case 'r':
                if (activeChFrame) {
                    const reloadBtn = activeElem.querySelector('.reload') as HTMLButtonElement;
                    reloadBtn.dispatchEvent(new MouseEvent('click', { shiftKey: e.shiftKey }));
                }
                break;
            case 'PageUp':
                e.preventDefault();
                this.onTuning('up');
                break;
            case 'PageDown':
                e.preventDefault();
                this.onTuning('down');
                break;
        }
        const isNumKey = !isNaN(parseInt(keyName, 10));
        if (isNumKey) {
            const num = parseInt(keyName, 10);
            this.onTuning(num);
        }
        showAndHide();
    }

    handleScroll(): void {
        const getScrollBottom = (): number => {
            const body = window.document.body;
            const html = window.document.documentElement;
            const scrollTop = body.scrollTop || html.scrollTop;
            return html.scrollHeight - window.innerHeight - scrollTop;
        };
        this.control.classList.toggle('slide', getScrollBottom() <= 10);
    }

    onDirectionalKey(key: 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'ArrowLeft'): void {
        const chFrames = Array.from(this.chList.querySelectorAll('.chframe')) as HTMLElement[];
        const current = document.activeElement as HTMLElement;
        if (!current || !current.classList.contains('chframe')) {
            const focusableFrame = chFrames.find(frame => frame.tabIndex === 0) as HTMLElement;
            focusableFrame?.focus();
            return;
        }
        const index = chFrames.indexOf(current);
        let nextIndex = null as number | null;
        const isChoiced = this.chList.classList.contains('choiced');
        if (isChoiced) {
            const listenFrameIndex = chFrames.findIndex(frame => frame.classList.contains('listening'));
            if (listenFrameIndex === -1) return;
            const tile = UIController.CHOICED_TILE;
            const cols = tile[0].length;
            const tileRow = tile.find(r => r.includes(index));
            if (!tileRow) return;
            const realTileLength = chFrames.length <= 7 ? 4 : 4 + Math.ceil((chFrames.length - 7) / cols);
            const pos = {
                x: tileRow.findIndex(i => i === index),
                y: tile.indexOf(tileRow)
            };
            const moveOnce = (pos: { x: number, y: number }) => {
                switch (key) {
                    case 'ArrowUp':
                        pos.y--;
                        break;
                    case 'ArrowRight':
                        pos.x++;
                        break;
                    case 'ArrowDown':
                        pos.y++;
                        break;
                    case 'ArrowLeft':
                        pos.x--;
                        break;
                }
                pos.x = (pos.x + tileRow.length) % tileRow.length;
                pos.y = (pos.y + realTileLength) % realTileLength;
                return tile[pos.y][pos.x];
            };
            nextIndex = moveOnce(pos);
            if (nextIndex === -1) { // 聴いているチャンネルの場所に移動しようとした場合
                return; // 移動しない
            }
        } else {
            const cols = 3;
            const blankFrames = chFrames.length % cols === 0 ? 0 : cols - (chFrames.length % cols);
            const totalFrames = chFrames.length + blankFrames;
            switch (key) {
                case 'ArrowUp':
                    nextIndex = (index - cols + totalFrames) % totalFrames;
                    break;
                case 'ArrowRight':
                    nextIndex = (index + 1) % chFrames.length;
                    break;
                case 'ArrowDown':
                    nextIndex = (index + cols) % totalFrames;
                    break;
                case 'ArrowLeft':
                    nextIndex = (index - 1 + chFrames.length) % chFrames.length;
                    break;
            }
            while (nextIndex > chFrames.length - 1) {
                const to = key === 'ArrowUp' ? -1 : 1;
                nextIndex = (nextIndex + to * cols + totalFrames) % totalFrames;
            }
        }
        chFrames[index].tabIndex = -1;
        chFrames[nextIndex].tabIndex = 0;
        chFrames[nextIndex].focus();
    }

    showAndHide(): void {
        if (this.hideTimer) clearTimeout(this.hideTimer);
        if (this.delayHideTimer) clearTimeout(this.delayHideTimer);
        this.wrap.classList.remove('hide-ui');
        this.wrap.classList.remove('hide-info');
        this.hideTimer = setTimeout(() => {
            this.wrap.classList.add('hide-ui');
            if (this.keepDisplaySw.checked) return;
            this.delayHideTimer = setTimeout(() => {
                this.wrap.classList.add('hide-info');
            }, 3000);
        }, 3000);
    }

    setOnTuning(callback: (ch: number | 'up' | 'down') => void): void {
        this.onTuning = callback;
    }

    setOnTileSplitClick(callback: () => void): void {
        this.onTileSplitClick = callback;
    }
}

// チャンネル管理クラス
class ChannelManager {
    channelsList: ILiveChannelsList | null;

    constructor() {
        this.channelsList = null;
    }

    async updateChannels(): Promise<void> {
        this.channelsList = await fetch(`${Utils.api_base_url}/channels`)
            .then(response => {
                if (response.status !== 200) {
                    console.log('error or no content', response.status);
                }
                return response.json();
            }).catch(e => {
                console.error('Failed to load', e);
                return null;
            });
    }

    getGR(): ILiveChannel[] {
        return this.channelsList?.GR || [];
    }

    getDisplayGR(): ILiveChannel[] {
        return this.getGR().filter(channel => channel.is_display === true);
    }
}

// チューナークラス
class Tuner {
    chList: HTMLElement;
    chFrames: ChannelFrame[];

    constructor(chList: HTMLElement, chFrames: ChannelFrame[]) {
        this.chList = chList;
        this.chFrames = chFrames;
    }

    tune(ch: number | 'up' | 'down' | 'all' | ChannelFrame): void {
        const beforeListening = this.chFrames.map(frame => frame.isListening);
        const isSingleListen = beforeListening.filter(listening => listening).length === 1;
        const listenIndex = beforeListening.indexOf(true);
        let listenPos: number | 'all' | null = null;
        if (typeof ch === 'number') {
            ch = ch === 0 ? 10 : ch;
            const foundFrameIndex = this.chFrames.findIndex(frame => frame.ch.remocon_id === ch);
            if (foundFrameIndex === -1) return;
            listenPos = foundFrameIndex;
        } else if (ch === 'up' || ch === 'down') {
            if (isSingleListen) {
                const relativeIndex = ch === 'up' ? 1 : -1;
                const index = (listenIndex + relativeIndex + this.chFrames.length) % this.chFrames.length;
                listenPos = index;
            } else {
                const focusableFrameIndex = this.chFrames.findIndex(frame => frame.focusable);
                listenPos = focusableFrameIndex;
            }
        } else if (ch === 'all') {
            listenPos = 'all';
        } else if (typeof ch === 'object') {
            const currentFrame = ch;
            const index = this.chFrames.indexOf(currentFrame);
            if (index === -1) return;
            if (!isSingleListen || listenIndex !== index) {
                listenPos = index;
            }
        }
        this.applyMuteState(listenPos);
    }

    applyMuteState(listenIndex: number | 'all' | null): void {
        const newStates = Array(this.chFrames.length).fill(false);
        const isSingleListen = typeof listenIndex === 'number';
        if (isSingleListen) {
            newStates[listenIndex] = true;
        }
        this.chFrames.forEach((frame, index) => {
            frame.isListening = newStates[index];
            if (frame.isListening) {
                frame.video.muted = false;
                frame.loadVideo();
            } else {
                frame.video.muted = true;
                frame.loadImage();
            }
            frame.elem.classList.toggle('listening', frame.isListening);
        });
        this.chList.classList.toggle('choiced', isSingleListen);
    }
}

// チャンネルフレームクラス
class ChannelFrame {
    ch: ILiveChannel;
    tuner: Tuner;
    elem: HTMLElement;
    img: HTMLImageElement;
    video: HTMLVideoElement;
    broadcastTitle: HTMLElement;
    title: HTMLElement;
    startTime: HTMLElement;
    endTime: HTMLElement;
    isListening: boolean;
    player: mpegts.Player | null;
    playbackStartupStarted: boolean;

    constructor(ch: ILiveChannel, tuner: Tuner) {
        this.ch = ch;
        this.tuner = tuner;
        this.elem = null as any;
        this.img = null as any;
        this.video = null as any;
        this.broadcastTitle = null as any;
        this.title = null as any;
        this.startTime = null as any;
        this.endTime = null as any;
        this.isListening = false;
        this.player = null;
        // 同じ Player で canplay が複数回発火しても、再生開始待機処理を重複実行しないためのフラグ
        this.playbackStartupStarted = false;
        this.createElement();
        this.setupEventListeners();
        this.loadImage();
    }

    get focusable(): boolean {
        return this.elem.tabIndex === 0;
    }

    set focusable(value: boolean) {
        this.elem.tabIndex = value ? 0 : -1;
    }

    createElement(): void {
        this.elem = document.createElement('div');
        this.elem.classList.add('chframe');
        this.focusable = false;
        this.elem.innerHTML = `
        <img>
        <video playsinline controlsList="noremoteplayback" autoplay></video>
        <div class="broadcast-wrap">
            <div class="broadcast-channel-box">
                <span class="broadcast-channel">${this.ch.remocon_id}</span>
                <img class="broadcast-logo" src="${Utils.api_base_url}/channels/${this.ch.id}/logo" alt="${this.ch.name}">
            </div>
            <div class="broadcast-title">
                <span class="broadcast-title-id">${this.ch.program_present?.title ?? '(情報なし)'}</span>
                <div class="broadcast-time">
                    <span class="broadcast-start">${this.ch.program_present ? this.getFormattedTime(this.ch.program_present.start_time) : '--:--'}</span>
                    <span class="broadcast-to">～</span>
                    <span class="broadcast-end">${this.ch.program_present ? this.getFormattedTime(this.ch.program_present.end_time) : '--:--'}</span>
                </div>
            </div>
        </div>
        `;
        this.img = this.elem.querySelector('img')!;
        this.video = this.elem.querySelector('video')!;
        this.broadcastTitle = this.elem.querySelector('.broadcast-title')!;
        this.title = this.elem.querySelector('.broadcast-title-id')!;
        this.startTime = this.elem.querySelector('.broadcast-start')!;
        this.endTime = this.elem.querySelector('.broadcast-end')!;
    }

    setupEventListeners(): void {
        this.elem.addEventListener('click', () => this.tuner.tune(this));
        this.img.addEventListener('load', () => {
            // MJPEG のロード完了前に同じチャンネルへ戻った場合、遅れて発火した load イベントで
            // 新しく作成した動画 Player を破棄してしまわないよう、現在も画像表示中の場合だけ破棄する
            if (this.isListening === false) {
                this.unloadVideo();
            }
        });
        this.video.addEventListener('loadeddata', () => {
            // 動画のロード完了前に画像表示へ戻った場合、古い loadeddata イベントで
            // 新しく読み込み始めた MJPEG を解除しないよう、現在も動画表示中の場合だけ破棄する
            if (this.isListening === true) {
                this.unloadImage();
            }
        });
        const startPlaybackAfterBuffering = async () => {
            // 画像表示中・Player の破棄後・同じ Player で処理開始済みの場合は何もしない
            if (this.isListening === false || this.player === null || this.playbackStartupStarted === true) return;
            this.playbackStartupStarted = true;

            // 待機開始時点の Player を保持し、待機中に Player が再作成されたことを単純な同一性比較で検出する
            const player = this.player;
            this.video.playbackRate = 0;

            const networkCircuitType = PlayerUtils.getNetworkCircuitType();
            let playbackBufferSeconds = networkCircuitType === 'Cellular' ? LIVE_PLAYBACK_BUFFER_SECONDS_STABLE : LIVE_PLAYBACK_BUFFER_SECONDS;
            // Safari の MSE はバッファ量が揺らぎやすいため、組み込みプレイヤーと同じく 0.3 秒余裕を持たせる
            if (Utils.isSafari() === true) {
                playbackBufferSeconds += 0.3;
            }

            while (this.player === player && this.getPlaybackBufferSeconds() < playbackBufferSeconds) {
                await Utils.sleep(0.1);
            }

            // 待機中に別のチャンネルへ切り替わった場合は、破棄済みの映像を操作しない
            if (this.player !== player) return;
            this.video.playbackRate = 1;
        };
        this.video.addEventListener('canplay', startPlaybackAfterBuffering);
    }

    loadImage(): void {
        if (this.img.getAttribute('src')) {
            return;
        }
        const streamPath = `${Utils.api_base_url}/streams/live/${this.ch.display_channel_id}/360p/i-mjpeg`;
        this.img.src = streamPath;
    }

    unloadImage(): void {
        this.img.src = '';
    }

    loadVideo(): void {
        if (mpegts.getFeatureList().mseLivePlayback) {
            // MJPEG のロード完了を待たずに同じチャンネルへ戻ると、以前の Player がまだ残っていることがある
            // 同じ HTMLVideoElement に複数の Player を紐付けると MSE の状態が競合するため、必ず以前の Player を破棄する
            this.unloadVideo();

            const streamPath = `${Utils.api_base_url}/streams/live/${this.ch.display_channel_id}/360p/mpegts`;
            const player = mpegts.createPlayer({
                type: 'mse',
                isLive: true,
                url: streamPath
            });
            this.player = player;
            player.attachMediaElement(this.video);
            player.load();
        }
    }

    unloadVideo(): void {
        // 次に作成する Player では再び再生開始待機処理を実行する
        this.playbackStartupStarted = false;
        if (this.player !== null) {
            // 破棄処理中に新しい Player が this.player に入っても巻き込まないよう、先に参照を切り離す
            const player = this.player;
            this.player = null;
            player.unload();
            player.detachMediaElement();
            player.destroy();
        }
    }

    getPlaybackBufferSeconds(): number {
        if (this.video.buffered.length === 0) return 0;
        return Math.max(this.video.buffered.end(this.video.buffered.length - 1) - this.video.currentTime, 0);
    }

    updateProgramInfo(ch: ILiveChannel): void {
        const programMetaElems = {
            title: this.title,
            startTime: this.startTime,
            endTime: this.endTime
        };
        const diffFrom = Object.values(programMetaElems).map(elem => elem.textContent);
        const diffTo = [
            ch.program_present?.title ?? '(情報なし)',
            ch.program_present ? this.getFormattedTime(ch.program_present.start_time) : '--:--',
            ch.program_present ? this.getFormattedTime(ch.program_present.end_time) : '--:--'
        ];
        const changed = diffFrom.toString() !== diffTo.toString();
        if (changed) {
            const html = `
            <span class="broadcast-title-id">${ch.program_present?.title ?? '(情報なし)'}</span>
            <div class="broadcast-time">
                <span class="broadcast-start">${ch.program_present ? this.getFormattedTime(ch.program_present.start_time) : '--:--'}</span>
                <span class="broadcast-to">～</span>
                <span class="broadcast-end">${ch.program_present ? this.getFormattedTime(ch.program_present.end_time) : '--:--'}</span>
            </div>
            `;
            this.broadcastTitle.innerHTML = html;
        }
    }

    getFormattedTime(str: string): string {
        return new Date(str).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
}

// フルスクリーン制御クラス
class FullscreenController {
    fullscreenBtn: HTMLButtonElement;

    constructor(fullscreenBtn: HTMLButtonElement) {
        this.fullscreenBtn = fullscreenBtn;
        this.init();
    }

    init(): void {
        this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        document.addEventListener('fullscreenchange', () => this.handleFullscreenChange());
    }

    toggleFullscreen(): void {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
                .catch((err) => {
                    alert('ご利用のブラウザは全画面表示に対応していません' + (err as Error).name);
                });
        } else {
            document.exitFullscreen();
        }
    }

    handleFullscreenChange(): void {
        if (document.fullscreenElement) {
            screen.orientation?.lock('landscape').catch(() => {});
            this.fullscreenBtn.innerHTML = '<i class="material-icons">fullscreen_exit</i>';
            this.fullscreenBtn.title = '全画面表示を終了(F)';
        } else {
            screen.orientation?.unlock();
            this.fullscreenBtn.innerHTML = '<i class="material-icons">fullscreen</i>';
            this.fullscreenBtn.title = '全画面表示(F)';
        }
    }
}

// メインアプリクラス
class App {
    wrap: HTMLElement;
    chList: HTMLElement;
    control: HTMLElement;
    tileSplitBtn: HTMLButtonElement;
    keepDisplaySw: HTMLInputElement;
    fullscreenBtn: HTMLButtonElement;
    uiController: UIController;
    channelManager: ChannelManager;
    chFrames: ChannelFrame[];
    tuner: Tuner;
    fullscreenController: FullscreenController;


    constructor() {
        this.wrap = document.getElementById('wrap')!;
        this.chList = document.getElementById('chlist')!;
        this.control = document.getElementById('control')!;
        this.tileSplitBtn = document.getElementById('tile-split-view') as HTMLButtonElement;
        this.keepDisplaySw = document.getElementById('keepshowsw') as HTMLInputElement;
        this.fullscreenBtn = document.getElementById('fsbutton') as HTMLButtonElement;

        this.uiController = new UIController(this.wrap, this.chList, this.control, this.tileSplitBtn, this.keepDisplaySw, this.fullscreenBtn);
        this.channelManager = new ChannelManager();
        this.chFrames = [];
        this.tuner = new Tuner(this.chList, this.chFrames);
        this.fullscreenController = new FullscreenController(this.fullscreenBtn);
    }

    async init(): Promise<void> {
        await this.channelManager.updateChannels();
        this.createChannelFrames();
        this.uiController.setOnTuning((ch) => this.tuner.tune(ch));
        this.uiController.setOnTileSplitClick(() => this.tuner.tune('all'));
        this.uiController.init();
        this.startPeriodicUpdate();
    }

    createChannelFrames(): void {
        this.channelManager.getDisplayGR().forEach((ch, index) => {
            const chFrame = new ChannelFrame(ch, this.tuner);
            this.chFrames.push(chFrame);
            if (index === 0) {
                chFrame.focusable = true;
            }
            this.chList.appendChild(chFrame.elem);
        });
    }

    startPeriodicUpdate(): void {
        setInterval(async () => {
            await this.channelManager.updateChannels();
            this.channelManager.getDisplayGR().forEach((ch, index) => {
                if (this.chFrames[index]) {
                    this.chFrames[index].updateProgramInfo(ch);
                }
            });
        }, 30 * 1000);
    }
}

// アプリ起動
const app = new App();
app.init();
