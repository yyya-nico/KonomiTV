import './style.scss';
import mpegts from 'mpegts.js';

import Utils from '@/utils';

const wrap = document.getElementById('wrap');
const chList = document.getElementById('chlist');
const control = document.getElementById('control');
const volumeButton = document.getElementById('volumebutton');
const keepShowSw = document.getElementById('keepshowsw');
const fullscreenButton = document.getElementById('fsbutton');

const controlInit = () => {
    let hideTimer = 0, delayHideTimer = 0;
    const showAndHide = () => {
        clearTimeout(hideTimer);
        clearTimeout(delayHideTimer);
        wrap.classList.remove('hide-ui');
        wrap.classList.remove('hide-info');
        hideTimer = setTimeout(() => {
            wrap.classList.add('hide-ui');
            if (keepShowSw.checked) {
                return;
            }
            delayHideTimer = setTimeout(() => {
                wrap.classList.add('hide-info');
            },3000);
        },3000);
    };
    window.addEventListener('pointerdown',showAndHide);
    window.addEventListener('pointermove',showAndHide);
    window.addEventListener('scroll',showAndHide);
    keepShowSw.addEventListener('change',showAndHide);

    window.addEventListener('keydown', (e) =>{
        const keyName = e.key;
        switch(keyName){
            case 'A':
            case 'a':
                volumeButton.click();
                break;
            case 'F':
            case 'f':
                fullscreenButton.click();
                break;
            case 'ArrowUp':
                tuning(-3);
                break;
            case 'ArrowLeft':
                tuning(-1);
                break;
            case 'ArrowRight':
                tuning(1);
                break;
            case 'ArrowDown':
                tuning(3);
                break;
        }
        showAndHide();
    });

    volumeButton.addEventListener('click', () => tuning('toggle-all'));

    window.addEventListener('scroll', () => {
        function getScrollBottom() {
            const body = window.document.body;
            const html = window.document.documentElement;
            const scrollTop = body.scrollTop || html.scrollTop;
            return html.scrollHeight - window.innerHeight - scrollTop;
        }
        if (getScrollBottom() <= 10) {
            //スクロールの位置が下10pxの範囲に来た場合
            control.classList.add('slide');
        } else {
            //それ以外のスクロールの位置の場合
            control.classList.remove('slide');
        }
    });

    showAndHide();
};
const channelsUpdate = async () => { // TODO: APIClient.get()を利用する
    channelsList = await fetch(`${Utils.getApiBaseUrl()}/channels`)
        .then(response => {
            if (response.status !== 200) {
                console.log('error or no content', response.status);
            }
            return response.json();
        }).catch(e => {
            console.error('Failed to load', e);
            return null;
        });
};
const getGR = () => channelsList?.GR;
const getDisplayGR = () => getGR().filter(channel => channel.is_display === true);
let channelsList;
(async () => await channelsUpdate())();

const getFormattedTime = str => new Date(str).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
const tuning = ch => {
    const audibleFrames = chFrames.filter(chFrame => !chFrame.video.muted);
    const noAudible = audibleFrames.length === 0;
    const allAudible = audibleFrames.length === chFrames.length;
    const muteFlags = Array(chFrames.length).fill(true);
    if (ch === 'all') {
        muteFlags.fill(false);
    } else if (ch === 'toggle-all') {
        if (!allAudible) {
            muteFlags.fill(false);
        }
    } else if (typeof ch === 'number') {
        if (noAudible) {
            muteFlags[0] = false;
        } else {
            const firstFrame = audibleFrames[0];
            const firstFrameIndex = firstFrame.index;
            let targetFrameIndex = (firstFrameIndex + ch) % chFrames.length;
            if (targetFrameIndex < 0) {
                targetFrameIndex = chFrames.length + targetFrameIndex;
            }
            muteFlags[targetFrameIndex] = false;
        }
    } else if (typeof ch === 'object') {
        const currentFrame = ch;
        if (allAudible || currentFrame.video.muted) {
            muteFlags[currentFrame.index] = false;
        }
    }
    chFrames.forEach((chFrame, index) => {
        chFrame.video.muted = muteFlags[index];
    });
    const singleUnmuted = chFrames.filter(chFrame => !chFrame.video.muted).length === 1;
    if (singleUnmuted) {
        chList.classList.add('choiced');
    } else {
        chList.classList.remove('choiced');
    }
};

const chFrames = [];
getDisplayGR().forEach((ch, index) => {
    const html =
    `<div class="chframe">
        <video playsinline controlsList="noremoteplayback"></video>
        <div class="broadcast-wrap">
            <div class="broadcast-channel-box">
                <span class="broadcast-channel">${ch.remocon_id}</span>
                <img class="broadcast-logo" src="${Utils.getApiBaseUrl()}/channels/${ch.id}/logo" alt="${ch.name}">
            </div>
            <div class="broadcast-title">
                <span class="broadcast-title-id">${ch.program_present?.title ?? '(情報なし)'}</span>
                <div class="broadcast-time">
                    <span class="broadcast-start">${ch.program_present ? getFormattedTime(ch.program_present.start_time) : '--:--'}</span>
                    <span class="broadcast-to">～</span>
                    <span class="broadcast-end">${ch.program_present ? getFormattedTime(ch.program_present.end_time) : '--:--'}</span>
                </div>
            </div>
        </div>
        <div class="control">
            <button type="button" class="reload btn" title="再読み込み"><i class="material-icons">refresh</i></button>
        </div>
    </div>
    `;
    chList.insertAdjacentHTML('beforeend', html);
    const chFrame = chList.lastElementChild;
    const chFrameProps = {
        chFrame,
        index,
        video: chFrame.querySelector('video'),
        reloadButton: chFrame.querySelector('.reload'),
        broadcastTitle: chFrame.querySelector('.broadcast-title'),
        title: chFrame.querySelector('.broadcast-title-id'),
        startTime: chFrame.querySelector('.broadcast-start'),
        endTime: chFrame.querySelector('.broadcast-end'),
    };
    chFrames.push(chFrameProps);
    chFrame.addEventListener('click', () => tuning(chFrameProps));
    chFrameProps.video.addEventListener('volumechange', e => {
        if (e.target.muted) {
            chFrame.classList.remove('listening');
        } else {
            chFrame.classList.add('listening');
        }
        const audible = chFrames.some(chFrame => !chFrame.video.muted);
        const allAudible = chFrames.every(chFrame => !chFrame.video.muted);
        if (audible) {
            volumeButton.innerHTML = '<i class="material-icons">volume_up</i>';
            if (allAudible) {
                volumeButton.title = 'ミュートする';
            } else {
                volumeButton.title = '全ch聴く';
            }
        } else {
            volumeButton.innerHTML = '<i class="material-icons">volume_off</i>';
            volumeButton.title = '全ch聴く';
        }
    });
    if (mpegts.getFeatureList().mseLivePlayback) {
        const streamPath = `${Utils.getApiBaseUrl()}/streams/live/${ch.display_channel_id}/360p/mpegts`;
        const player = mpegts.createPlayer({
            type: 'mse',  // could also be mpegts, m2ts, flv
            isLive: true,
            url: streamPath
        });
        player.attachMediaElement(chFrameProps.video);
        chFrameProps.reloadButton.addEventListener('click', e => {
            e.stopPropagation();
            player.unload();
            if (e.shiftKey) {
                alert('Shiftキーを押しながらクリックしたため、読み込み停止をしました。');
                return;
            }
            player.load();
            player.play();
        });
        player.load();
        player.play()
            .then(() => {
                tuning('all');
            })
            .catch(() => {
                player.muted = true;
                player.play();
            });
    }
});
controlInit();

setInterval(async () => {
    await channelsUpdate();
    getDisplayGR().forEach((ch, index) => {
        const chFrame = chFrames[index]; // TODO:放送の数の増減の考慮(サブチャンネルとか)
        const programMetaElems = {
            title: chFrame.title,
            startTime: chFrame.startTime,
            endTime: chFrame.endTime
        };
        const diffFrom = Object.values(programMetaElems).map(elem => elem.textContent);
        const diffTo = [
            ch.program_present?.title ?? '(情報なし)',
            ch.program_present ? getFormattedTime(ch.program_present.start_time) : '--:--',
            ch.program_present ? getFormattedTime(ch.program_present.end_time) : '--:--'
        ];
        const changed = diffFrom.toString() !== diffTo.toString();
        if (changed) {
            const html =
            `<span class="broadcast-title-id">${ch.program_present?.title ?? '(情報なし)'}</span>
                <div class="broadcast-time">
                    <span class="broadcast-start">${ch.program_present ? getFormattedTime(ch.program_present.start_time) : '--:--'}</span>
                    <span class="broadcast-to">～</span>
                    <span class="broadcast-end">${ch.program_present ? getFormattedTime(ch.program_present.end_time) : '--:--'}</span>
                </div>
            </div>`;
            chFrame.broadcastTitle.innerHTML = html;
        }
    });
}, 30 * 1000);

fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
            .catch((err) => {
                alert('ご利用のブラウザは全画面表示に対応していません' + err.name);
            });
    } else {
        document.exitFullscreen();
    }
});

const fullscreenChangeHandler = () => {
    if(document.fullscreenElement) {
        screen.orientation.lock('landscape').catch(()=>{});
        fullscreenButton.innerHTML = '<i class="material-icons">fullscreen_exit</i>';
        fullscreenButton.title = '全画面表示を終了';
    }else{
        screen.orientation.unlock && screen.orientation.unlock();
        fullscreenButton.innerHTML = '<i class="material-icons">fullscreen</i>';
        fullscreenButton.title = '全画面表示';
    }
};
document.addEventListener('fullscreenchange', fullscreenChangeHandler);
