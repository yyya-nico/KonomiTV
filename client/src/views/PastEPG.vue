<template>
    <div class="route-container">
        <HeaderBar />
        <main>
            <Navigation />
            <div class="pastepg-container-wrapper">
                <div class="pastepg-container">
                    <Breadcrumbs :crumbs="[
                        { name: 'ホーム', path: '/' },
                        { name: '過去番組表', path: '/pastepg/', disabled: true },
                    ]" />
                    <PastEPGViewer
                        title="過去番組表"
                        :programs="programs"
                        :total="total_programs"
                        :page="current_page"
                        :isLoading="is_loading"
                        :showBackButton="true"
                        :showEmptyMessage="!is_loading"
                        :updatePage="updatePage" />
                </div>
            </div>
        </main>
    </div>
</template>
<script lang="ts" setup>

import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Breadcrumbs from '@/components/Breadcrumbs.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import Navigation from '@/components/Navigation.vue';
import PastEPGViewer from '@/components/Videos/PastEPGViewer.vue';
import { IRecordedProgram } from '@/services/Videos';
import Videos from '@/services/Videos';

// ルーター
const route = useRoute();
const router = useRouter();

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

// 開始時に実行
onMounted(async () => {
    // 録画番組を取得
    await fetchPrograms();
});

</script>
<style lang="scss" scoped>

.pastepg-container-wrapper {
    display: flex;
    flex-direction: column;
    --navigation-width: 220px;
    width: calc(100% - var(--navigation-width));
    @include smartphone-horizontal {
        --navigation-width: 210px;
    }
    @include smartphone-vertical {
        width: 100%;
        padding-top: 10px !important;
    }
}

.pastepg-container {
    display: flex;
    flex-direction: column;
    width: fit-content;
    max-width: 100%;
    height: 100%;
    padding: 20px;
    margin: 0 auto;
    min-width: 0;
    @include smartphone-horizontal {
        padding: 16px 20px !important;
    }
    @include smartphone-horizontal-short {
        padding: 16px 16px !important;
    }
    @include smartphone-vertical {
        padding: 16px 8px !important;
        padding-top: 8px !important;
    }
}

</style>