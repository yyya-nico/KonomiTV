import './style.css';
import mpegts from 'mpegts.js';

import Utils from '@/utils';


document.addEventListener('DOMContentLoaded', async () => {
    const wrap = document.getElementById('wrap');
    const chList = document.getElementById('chlist');
    const chFrames = chList.children;
    const broadcastInfos = document.getElementsByClassName('broadcast-wrap');
    const broadcastTitles = document.getElementsByClassName('broadcast-title');
    const controlWraps = document.getElementsByClassName('control');
    const controlWrap = document.getElementById('control');
    const volumeButton = document.getElementById('volumebutton');
    const showSw = document.getElementById('showsw');
    const fullscreenButton = document.getElementById('fsbutton');
    const controlInit = () => {
        let fadeTimer = 0,delayfadeTimer = 0,expandTimer = Array(broadcastTitles.length).fill(0);

        function fade() {
            clearTimeout(fadeTimer);
            clearTimeout(delayfadeTimer);
            wrap.classList.remove('hide');
            [...broadcastInfos].forEach(broadcastInfo => {
                broadcastInfo.classList.remove('hide');
            });
            [...controlWraps].forEach(controlWrap => {
                controlWrap.classList.remove('hide');
            });
            controlWrap.classList.remove('hide');
            fadeTimer = setTimeout(function() {
                wrap.classList.add('hide');
                [...controlWraps].forEach(controlWrap => {
                    controlWrap.classList.add('hide');
                });
                controlWrap.classList.add('hide');
                if (showSw.checked) {
                    return;
                }
                delayfadeTimer = setTimeout(function() {
                    [...broadcastInfos].forEach(broadcastInfo => {
                        broadcastInfo.classList.add('hide');
                    });
                },3000);
            },3000);
        }
        let expandedIndex = null;
        function expand(index) {
            if (index != expandedIndex) {
                if(expandedIndex != null){
                    broadcastTitles[expandedIndex].classList.remove('expand');
                }
                expandedIndex = index;
            }
            clearTimeout(expandTimer[index]);
            broadcastTitles[index].classList.add('expand');
            expandTimer[index] = setTimeout(function() {
                broadcastTitles[index].classList.remove('expand');
            },6000);
        }
        window.addEventListener('pointerdown',fade);
        window.addEventListener('pointermove',fade);
        window.addEventListener('scroll',fade);
        showSw.addEventListener('change',fade);
        [...chFrames].forEach((chFrame, index) => {
            chFrame.addEventListener('touchstart', () => expand(index));
            chFrame.addEventListener('pointermove', () => expand(index));
            chFrame.addEventListener('mouseleave',function() {
                broadcastTitles[index].classList.remove('expand');
            });
        });
        window.addEventListener('keydown',function(e){//キーボード操作
            const keyName = e.key;
            function chPick() {
                tuning(0);
            }
            fade();
            switch(keyName){
                case 'A':
                case 'a':
                    volumeButton.click();
                    fade();
                    break;
                case 'F':
                case 'f':
                    fullscreenButton.click();
                    fade();
                    break;
                case 'ArrowUp':
                    if (!isNaN(listening) && listening !== null) {
                        if (listening - 3 >= 0) {
                            tuning(listening - 3);
                        }
                    } else {
                        chPick();
                    }
                    expand(listening);
                    break;
                case 'ArrowLeft':
                    if (!isNaN(listening) && listening !== null) {
                        if (listening - 1 >= 0) {
                            tuning(listening - 1);
                        }
                    } else {
                        chPick();
                    }
                    expand(listening);
                    break;
                case 'ArrowRight':
                    if (!isNaN(listening) && listening !== null) {
                        if (listening + 1 < chFrames.length) {
                            tuning(listening + 1);
                        }
                    } else {
                        chPick();
                    }
                    expand(listening);
                    break;
                case 'ArrowDown':
                    if (!isNaN(listening) && listening !== null) {
                        if (listening + 3 < chFrames.length) {
                            tuning(listening + 3);
                        }
                    } else {
                        chPick();
                    }
                    expand(listening);
                    break;
            }
        });
        volumeButton.addEventListener('click',function() {
            listening !== 'all' ? tuning('all') : tuning(null);
        });
        window.addEventListener('scroll',function() {
            function getScrollBottom() {
                const body = window.document.body;
                const html = window.document.documentElement;
                const scrollTop = body.scrollTop || html.scrollTop;
                return html.scrollHeight - window.innerHeight - scrollTop;
            }
            if (getScrollBottom() <= 10) {
                //スクロールの位置が下10pxの範囲に来た場合
                controlWrap.classList.add('slide');
            } else {
                //それ以外のスクロールの位置の場合
                controlWrap.classList.remove('slide');
            }
        });
        fade();
    };
    const channelsUpdate = async () => {
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
    const getGR = () => channelsList.GR;
    const getDisplayGR = () => getGR().filter(channel => channel.is_display === true);
    let channelsList;
    await channelsUpdate();

    const getFormattedTime = str => new Date(str).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const tuning = ch => {
        switch (ch) {
            case null:
                chList.classList.remove('choiced');
                [...chFrames].forEach(chFrame => {
                    chFrame.classList.remove('listening');
                    const video = chFrame.querySelector('video');
                    video.muted = true;
                });
                volumeButton.innerHTML = '<i class="material-icons">volume_off</i>';
                volumeButton.title = '全ch聴く';
                break;
            case 'all':
                chList.classList.remove('choiced');
                [...chFrames].forEach(chFrame => {
                    chFrame.classList.add('listening');
                    const video = chFrame.querySelector('video');
                    video.muted = false;
                });
                volumeButton.innerHTML = '<i class="material-icons">volume_up</i>';
                volumeButton.title = 'ミュートする';
                break;
            default:
                chList.classList.add('choiced');
                [...chFrames].forEach((chFrame, index) => {
                    const video = chFrame.querySelector('video');
                    if (index === ch) {
                        chFrame.classList.add('listening');
                        video.muted = false;
                    } else {
                        chFrame.classList.remove('listening');
                        video.muted = true;
                    }
                });
                volumeButton.innerHTML = '<i class="material-icons">volume_up</i>';
                volumeButton.title = '全ch聴く';
                break;
        }
        listening = ch;
    };

    let listening = null;
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
                <button type="button" class="reload" title="再読み込み"><i class="material-icons">refresh</i></button>
            </div>
        </div>
        `;
        chList.insertAdjacentHTML('beforeend', html);
        const chFrame = chList.lastElementChild;
        const video = chFrame.querySelector('video');
        const reloadButton = chFrame.querySelector('.reload');
        chFrame.addEventListener('click',function() {
            if (listening === index) {
                tuning(null);
            } else {
                tuning(index);
            }
        });
        if (mpegts.getFeatureList().mseLivePlayback) {
            const streamPath = `${Utils.getApiBaseUrl()}/streams/live/${ch.display_channel_id}/360p/mpegts`;
            const player = mpegts.createPlayer({
                type: 'mse',  // could also be mpegts, m2ts, flv
                isLive: true,
                url: streamPath
            });
            player.attachMediaElement(video);
            reloadButton.addEventListener('click', e => {
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
                .then(function () {
                    tuning('all');
                })
                .catch(function () {
                    player.muted = true;
                    player.play();
                });
        }
    });
    controlInit();

    setInterval(async () => {
        await channelsUpdate();
        getDisplayGR().forEach((ch, index) => {
            const broadcastTitle = broadcastTitles[index];
            const programMetaElems = {
                title: broadcastTitle.querySelector('.broadcast-title-id'),
                startTime: broadcastTitle.querySelector('.broadcast-start'),
                endTime: broadcastTitle.querySelector('.broadcast-end'),
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
                broadcastTitle.innerHTML = html;
            }
        });
    }, 30 * 1000);
});
