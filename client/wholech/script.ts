import './style.scss';

import mpegts from 'mpegts.js';

import type { ILiveChannel, ILiveChannelsList } from '@/services/Channels';

import Utils from '@/utils';

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
    volumeBtn: HTMLButtonElement;
    keepDisplaySw: HTMLInputElement;
    fullscreenBtn: HTMLButtonElement;
    hideTimer: ReturnType<typeof setTimeout> | null;
    delayHideTimer: ReturnType<typeof setTimeout> | null;
    onVolumeClick: () => void;
    onTuning: (ch: number) => void;

    constructor(wrap: HTMLElement, chList: HTMLElement, control: HTMLElement, volumeBtn: HTMLButtonElement, keepDisplaySw: HTMLInputElement, fullscreenBtn: HTMLButtonElement) {
        this.wrap = wrap;
        this.chList = chList;
        this.control = control;
        this.volumeBtn = volumeBtn;
        this.keepDisplaySw = keepDisplaySw;
        this.fullscreenBtn = fullscreenBtn;
        this.hideTimer = null;
        this.delayHideTimer = null;
        this.onVolumeClick = () => {};
        this.onTuning = () => {};
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

        this.volumeBtn.addEventListener('click', () => this.onVolumeClick());

        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleKeydown(e: KeyboardEvent, showAndHide: () => void): void {
        const keyName = e.key;
        const activeElem = document.activeElement as HTMLElement;
        const activeChFrame = activeElem && activeElem.classList.contains('chframe');
        switch (keyName) {
            case 'V':
            case 'v':
                this.volumeBtn.click();
                this.volumeBtn.focus();
                break;
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
            case 'ArrowUp':
            case 'ArrowRight':
            case 'ArrowDown':
            case 'ArrowLeft':
                this.onDirectionalKey(keyName);
                break;
            case ' ':
                if (activeChFrame) {
                    e.preventDefault();
                    activeElem.click();
                }
                break;
            case 'R':
            case 'r':
                if (activeChFrame) {
                    e.preventDefault();
                    const reloadBtn = activeElem.querySelector('.reload') as HTMLButtonElement;
                    reloadBtn.click();
                }
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
            if (index === listenFrameIndex) {
                switch (key) {
                    case 'ArrowUp':
                    case 'ArrowDown':
                        nextIndex = 0;
                        if (nextIndex === listenFrameIndex) nextIndex++;
                        break;
                    case 'ArrowRight':
                    case 'ArrowLeft':
                        nextIndex = chFrames.length - 1;
                        if (nextIndex === listenFrameIndex) nextIndex--;
                        break;
                }
            } else {
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
                    nextIndex = listenFrameIndex;
                } else if (nextIndex === listenFrameIndex) { // 隣が聴いているチャンネルだった場合
                    nextIndex = moveOnce(pos);
                }
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
                    nextIndex = (index + 1) % totalFrames;
                    break;
                case 'ArrowDown':
                    nextIndex = (index + cols) % totalFrames;
                    break;
                case 'ArrowLeft':
                    nextIndex = (index - 1 + totalFrames) % totalFrames;
                    break;
            }
            if (nextIndex >= chFrames.length) {
                if (key === 'ArrowUp' || key === 'ArrowDown') {
                    nextIndex = nextIndex % cols;
                } else {
                    nextIndex = key === 'ArrowRight' ? 0 : chFrames.length - 1;
                }
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

    setOnVolumeClick(callback: () => void): void {
        this.onVolumeClick = callback;
    }

    setOnTuning(callback: (ch: number) => void): void {
        this.onTuning = callback;
    }
}

// チャンネル管理クラス
class ChannelManager {
    channelsList: ILiveChannelsList | null;

    constructor() {
        this.channelsList = null;
    }

    async updateChannels(): Promise<void> {
        this.channelsList = await fetch(`${Utils.getApiBaseUrl()}/channels`)
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
    chFrames: ChannelFrame[];
    chList: HTMLElement;
    volumeBtn: HTMLButtonElement;

    constructor(chFrames: ChannelFrame[], chList: HTMLElement, volumeBtn: HTMLButtonElement) {
        this.chFrames = chFrames;
        this.chList = chList;
        this.volumeBtn = volumeBtn;
    }

    tune(ch: number | 'up' | 'down' | 'all' | 'toggle-all' | ChannelFrame): void {
        let unmutePos: number | 'all' | null = null;
        if (typeof ch === 'number') {
            ch = ch === 0 ? 10 : ch;
            const foundFrameIndex = this.chFrames.findIndex(frame => frame.ch.remocon_id === ch);
            if (foundFrameIndex === -1) return;
            unmutePos = foundFrameIndex;
        } else if (ch === 'up' || ch === 'down') {
            const beforeMuted = this.chFrames.map(frame => frame.video.muted);
            const isSingleUnmuted = beforeMuted.filter(muted => !muted).length === 1;
            if (isSingleUnmuted) {
                const relativeIndex = ch === 'up' ? 1 : -1;
                const index = (beforeMuted.indexOf(false) + relativeIndex + this.chFrames.length) % this.chFrames.length;
                unmutePos = index;
            } else {
                unmutePos = 0;
            }
        } else if (ch === 'all') {
            unmutePos = 'all';
        } else if (ch === 'toggle-all') {
            const allMuted = this.chFrames.every(frame => frame.video.muted);
            if (allMuted) {
                unmutePos = 'all';
            }
        } else if (typeof ch === 'object') {
            const currentFrame = ch;
            const index = this.chFrames.indexOf(currentFrame);
            if (index === -1) return;
            if (currentFrame.video.muted) {
                unmutePos = index;
            }
        }
        this.applyMuteState(unmutePos);
    }

    applyMuteState(unmutePos: number | 'all' | null): void {
        const newStates = Array(this.chFrames.length).fill(true);
        if (unmutePos === 'all') {
            newStates.fill(false);
        } else if (typeof unmutePos === 'number') {
            newStates[unmutePos] = false;
        }
        this.chFrames.forEach((frame, index) => {
            frame.video.muted = newStates[index];
        });
        const isSingleUnmuted = newStates.filter(muted => !muted).length === 1;
        this.chList.classList.toggle('choiced', isSingleUnmuted);
        this.updateVolumeButton();
    }

    updateVolumeButton(): void {
        const audible = this.chFrames.some(chFrame => !chFrame.video.muted);
        const allAudible = this.chFrames.every(chFrame => !chFrame.video.muted);
        if (audible) {
            this.volumeBtn.innerHTML = '<i class="material-icons">volume_up</i>';
            if (allAudible) {
                this.volumeBtn.title = 'ミュートする(V)';
            } else {
                this.volumeBtn.title = '全ch聴く(V)';
            }
        } else {
            this.volumeBtn.innerHTML = '<i class="material-icons">volume_off</i>';
            this.volumeBtn.title = '全ch聴く(V)';
        }
    }
}

// チャンネルフレームクラス
class ChannelFrame {
    ch: ILiveChannel;
    tuner: Tuner;
    elem: HTMLElement;
    video: HTMLVideoElement;
    reloadButton: HTMLButtonElement;
    broadcastTitle: HTMLElement;
    title: HTMLElement;
    startTime: HTMLElement;
    endTime: HTMLElement;
    player: any; // mpegts.Player

    constructor(ch: ILiveChannel, tuner: Tuner) {
        this.ch = ch;
        this.tuner = tuner;
        this.elem = null as any;
        this.video = null as any;
        this.reloadButton = null as any;
        this.broadcastTitle = null as any;
        this.title = null as any;
        this.startTime = null as any;
        this.endTime = null as any;
        this.player = null;
        this.createElement();
        this.setupEventListeners();
        this.initPlayer();
    }

    createElement(): void {
        this.elem = document.createElement('div');
        this.elem.classList.add('chframe');
        this.elem.tabIndex = -1;
        this.elem.innerHTML = `
        <video playsinline controlsList="noremoteplayback" autoplay muted></video>
        <div class="broadcast-wrap">
            <div class="broadcast-channel-box">
                <span class="broadcast-channel">${this.ch.remocon_id}</span>
                <img class="broadcast-logo" src="${Utils.getApiBaseUrl()}/channels/${this.ch.id}/logo" alt="${this.ch.name}">
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
        <div class="control">
            <button type="button" class="reload btn" title="再読み込み"><i class="material-icons">refresh</i></button>
        </div>
        `;
        this.video = this.elem.querySelector('video')!;
        this.reloadButton = this.elem.querySelector('.reload')!;
        this.broadcastTitle = this.elem.querySelector('.broadcast-title')!;
        this.title = this.elem.querySelector('.broadcast-title-id')!;
        this.startTime = this.elem.querySelector('.broadcast-start')!;
        this.endTime = this.elem.querySelector('.broadcast-end')!;
    }

    setupEventListeners(): void {
        this.elem.addEventListener('click', () => this.tuner.tune(this));
        this.video.addEventListener('volumechange', (e: Event) => this.handleVolumeChange(e as Event & { target: HTMLVideoElement }));
    }

    handleVolumeChange(e: Event & { target: HTMLVideoElement }): void {
        this.elem.classList.toggle('listening', !e.target.muted);
    }

    initPlayer(): void {
        if (mpegts.getFeatureList().mseLivePlayback) {
            const streamPath = `${Utils.getApiBaseUrl()}/streams/live/${this.ch.display_channel_id}/360p/mpegts`;
            this.player = mpegts.createPlayer({
                type: 'mse',
                isLive: true,
                url: streamPath
            });
            this.player.attachMediaElement(this.video);
            this.reloadButton.addEventListener('click', (e: Event) => this.handleReload(e as MouseEvent));
            this.player.load();
        }
    }

    handleReload(e: MouseEvent): void {
        e.stopPropagation();
        this.player.unload();
        if (e.shiftKey) {
            alert('Shiftキーを押しながらクリックしたため、読み込み停止をしました。');
            return;
        }
        this.player.load();
        this.player.play();
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
    volumeBtn: HTMLButtonElement;
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
        this.volumeBtn = document.getElementById('volumebutton') as HTMLButtonElement;
        this.keepDisplaySw = document.getElementById('keepshowsw') as HTMLInputElement;
        this.fullscreenBtn = document.getElementById('fsbutton') as HTMLButtonElement;

        this.uiController = new UIController(this.wrap, this.chList, this.control, this.volumeBtn, this.keepDisplaySw, this.fullscreenBtn);
        this.channelManager = new ChannelManager();
        this.chFrames = [];
        this.tuner = new Tuner(this.chFrames, this.chList, this.volumeBtn);
        this.fullscreenController = new FullscreenController(this.fullscreenBtn);
    }

    async init(): Promise<void> {
        await this.channelManager.updateChannels();
        this.createChannelFrames();
        this.uiController.setOnVolumeClick(() => this.tuner.tune('toggle-all'));
        this.uiController.setOnTuning((ch) => this.tuner.tune(ch));
        this.uiController.init();
        this.startPeriodicUpdate();
    }

    createChannelFrames(): void {
        this.channelManager.getDisplayGR().forEach((ch, index) => {
            const chFrame = new ChannelFrame(ch, this.tuner);
            this.chFrames.push(chFrame);
            if (index === 0) {
                chFrame.elem.tabIndex = 0;
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
