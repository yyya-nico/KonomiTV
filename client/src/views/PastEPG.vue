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
                        :isLoading="is_loading"
                        :showBackButton="true"
                        :showEmptyMessage="!is_loading" />
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
const total_programs = ref(Infinity);
const is_loading = ref(true);

// 録画番組を取得
const fetchPrograms = async () => {
    for (let index = 1; index <= total_programs.value / 100; index++) {
        const result = await Videos.fetchVideos('desc', index);
        if (result) {
            programs.value = [...programs.value, ...result.recorded_programs];
            total_programs.value = result.total;
        }
    }
    programs.value = programs.value.reverse();
    is_loading.value = false;
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
    width: 100%;
    @include smartphone-vertical {
        padding-top: 10px !important;
    }
}

.pastepg-container {
    display: flex;
    flex-direction: column;
    width: fit-content;
    height: 100%;
    padding: 20px;
    margin: 0 auto;
    min-width: 1000px;
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