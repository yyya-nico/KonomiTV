<template>
    <div class="route-container">
        <HeaderBar />
        <main>
            <Navigation :icon-only="isNavigationIconOnly" />
            <div class="past-timetable-container">
                <SPHeaderBar />
                <PastTimeTableGrid
                    :programs="programs"
                    :total="total_programs"
                    :page="current_page"
                    :isLoading="is_loading"
                    :showBackButton="true"
                    :showEmptyMessage="!is_loading"
                    :updatePage="updatePage" />
            </div>
        </main>
    </div>
</template>
<script lang="ts" setup>

import { computed, onMounted, onUnmounted, ref } from 'vue';

import HeaderBar from '@/components/HeaderBar.vue';
import Navigation from '@/components/Navigation.vue';
import SPHeaderBar from '@/components/SPHeaderBar.vue';
import PastTimeTableGrid from '@/components/Videos/PastTimeTableGrid.vue';
import { IRecordedProgram } from '@/services/Videos';
import Videos from '@/services/Videos';
import Utils from '@/utils';

// ウィンドウリサイズ時にリアクティブに再計算をトリガーするためのカウンター
// window.innerWidth や window.matchMedia() の結果は Vue のリアクティブシステムでは追跡されないため、
// リサイズイベント発火時にこのカウンターをインクリメントし、computed がこの値を参照することで再計算をトリガーする
const windowResizeCounter = ref(0);

// リサイズイベントハンドラー (デバウンス処理付き)
let resizeDebounceTimerId: number | null = null;
const RESIZE_DEBOUNCE_MS = 100;
function onWindowResize() {
    // デバウンス処理: 連続したリサイズイベントを間引く
    if (resizeDebounceTimerId !== null) {
        clearTimeout(resizeDebounceTimerId);
    }
    resizeDebounceTimerId = window.setTimeout(() => {
        windowResizeCounter.value++;
        resizeDebounceTimerId = null;
    }, RESIZE_DEBOUNCE_MS);
}

// Navigation の icon-only 判定 (リサイズ対応)
const isNavigationIconOnly = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _trigger = windowResizeCounter.value;
    return !Utils.isSmartphoneVertical();
});

// 録画番組のリスト
const programs = ref<IRecordedProgram[]>([]);
const total_programs = ref(0);
const is_loading = ref(true);

// 現在のページ番号
const current_page = ref(1);

// 録画番組を取得
const fetchPrograms = async () => {
    let fetched_programs: IRecordedProgram[] = [];
    const current_page_cache = current_page.value;
    for (let index = (current_page_cache - 1) * 3 + 1; index <= current_page_cache * 3; index++) {
        const result = await Videos.fetchVideos('desc', index);
        if (result) {
            fetched_programs = [...fetched_programs, ...result.recorded_programs];
            total_programs.value = result.total;
        }
    }
    fetched_programs = fetched_programs.reverse();
    programs.value = [...fetched_programs, ...programs.value];
    is_loading.value = false;
};

// ページを更新
const updatePage = async (page: number) => {
    current_page.value = page;
    await fetchPrograms();
};

// ライフサイクル
onMounted(async () => {
    // ウィンドウリサイズイベントリスナーを登録
    // 画面回転やウィンドウサイズ変更時に、レイアウト判定の再計算をトリガーする
    window.addEventListener('resize', onWindowResize);

    // 録画番組を取得
    await fetchPrograms();
});

onUnmounted(() => {
    // ウィンドウリサイズイベントリスナーを解除
    window.removeEventListener('resize', onWindowResize);
    // デバウンスタイマーをクリア
    if (resizeDebounceTimerId !== null) {
        clearTimeout(resizeDebounceTimerId);
        resizeDebounceTimerId = null;
    }
});

</script>
<style lang="scss" scoped>

.past-timetable-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    position: relative;
    min-width: 0;
    min-height: 0;  // flex アイテムがオーバーフローしないように
    // 番組表はビューポート内でスクロールさせるため、高さを明示的に制限する
    // App.vue の main は min-height: 100% で拡大可能なため、ここで高さを制限しないとスクロールが効かない
    // ヘッダー (65px) と ナビゲーション幅は Navigation コンポーネント側で調整されている
    height: calc(100vh - 65px);
    height: calc(100dvh - 65px);  // iOS Safari 対応
    @include smartphone-horizontal {
        height: 100vh;
        height: 100dvh;
    }
    @include smartphone-vertical {
        // スマホ縦画面ではヘッダーなし + ボトムナビゲーションバー (56px) + safe-area
        height: calc(100vh - 56px - env(safe-area-inset-bottom));
        height: calc(100dvh - 56px - env(safe-area-inset-bottom));
    }
    background: rgb(var(--v-theme-background));

    &--loading {
        pointer-events: none;
    }
}

</style>