
from typing import Annotated
from urllib.parse import unquote, urlsplit

from fastapi import APIRouter, Query
from fastapi.responses import RedirectResponse


router = APIRouter(tags=['Auth'], prefix='/api/auth')


@router.get('/reauth', summary='アクセス再認証 API')
async def AuthReauthenticateAPI(return_to: Annotated[str, Query()] = '/') -> RedirectResponse:
    """
    リバースプロキシ側のアクセス認証を通過したブラウザを元の画面へ戻す。

    Args:
        return_to (str): 認証前に表示しようとしていた同一サイト内のパス。

    Returns:
        RedirectResponse: 元の画面、または安全な戻り先としてトップページへのリダイレクト。
    """

    # 外部サイトへのリダイレクトやブラウザによるバックスラッシュ・制御文字の解釈を防ぐ。
    # パーセントエンコードされた値も検査し、再認証 API 自身への復帰ループも拒否する。
    decoded_return_to = unquote(return_to)
    if (not decoded_return_to.startswith('/') or decoded_return_to.startswith('//') or
        '\\' in decoded_return_to or any(ord(char) < 32 or ord(char) == 127 for char in decoded_return_to)):
        return_to = '/'
    else:
        # API・Cloudflare の管理パスは画面の戻り先として使わない。
        path = urlsplit(decoded_return_to).path
        if path.startswith(('/api', '/cdn-cgi')):
            return_to = '/'

    # 認証のたびに必ずネットワークを通すため、リダイレクト結果はキャッシュしない。
    return RedirectResponse(return_to, status_code=303, headers={'Cache-Control': 'no-store'})
