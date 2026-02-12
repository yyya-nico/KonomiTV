<template>
    <div class="past-timetable-grid">
        <div class="past-timetable-grid__grid"
            :class="{
                'past-timetable-grid__grid--loading': isLoading
            }">
            <div class="past-timetable-grid__grid-content">
                <v-infinite-scroll v-if="!isLoading" id="epg-container" side="start" @load="load">
                    <template v-slot:empty>すべて読み込みました</template>
                    <div id="channels">
                        <div class="dummy"></div>
                        <div v-for="channel in channels" :key="channel" class="channel-name">
                            {{ channel }}
                        </div>
                    </div>
                    <div id="times">
                        <div v-for="(time, i) in timeLabels" :key="i" class="time-label">
                            <span v-if="time.getHours() === 0 || i === 0" class="date"
                                >{{ time.toLocaleDateString([], { month: 'numeric', day: 'numeric', weekday: 'short' }) }}</span
                            >{{time.toLocaleTimeString([], { hour: 'numeric' }) }}
                        </div>
                    </div>
                    <div id="schedule"
                        :style="{
                            '--minute-sum': 60 * timeLabels.length,
                        }">
                        <router-link v-ripple class="program" v-for="program in displayPrograms" :key="program.id"
                            :title="program.title"
                            :class="['program', getClassName(program)]"
                            :style="{
                                gridColumn: channels.indexOf(program.channel?.name) + 1,
                                gridRowStart: Math.floor((new Date(program.start_time).getTime() - new Date(timeLabels[0]).getTime()) / (60 * 1000)) + 1,
                                gridRowEnd: `span ${Math.ceil(program.duration / 60)}`
                            }"
                            :to="program.recorded_video.status === 'Recording' || !program.recorded_video.has_key_frames ? { path: '' } : `/videos/watch/${program.id}`">
                            <div class="program-title">
                                <div class="program-start-time">{{ new Date(program.start_time).getMinutes().toString().padStart(2, '0') }}</div>
                                {{ program.title }}
                            </div>
                            <div class="program-description">
                                {{ program.description }}
                            </div>
                        </router-link>
                    </div>
                </v-infinite-scroll>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>

import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

import { IRecordedProgram } from '@/services/Videos';

const router = useRouter();

// Props
const props = withDefaults(defineProps<{
    programs: IRecordedProgram[];
    total: number;
    updatePage: (page: number) => Promise<void>;
    page?: number;
    hideHeader?: boolean;
    showBackButton?: boolean;
    showEmptyMessage?: boolean;
    emptyIcon?: string;
    emptyMessage?: string;
    emptySubMessage?: string;
    isLoading?: boolean;
}>(), {
    page: 1,
    hideHeader: false,
    hideSort: false,
    showMoreButton: false,
    showBackButton: false,
    showEmptyMessage: true,
    emptyIcon: 'fluent:warning-20-regular',
    emptyMessage: '録画番組が見つかりませんでした。',
    emptySubMessage: 'サーバー設定で録画フォルダのパスを<br class="d-sm-none">正しく設定できているか確認してください。',
    isLoading: false,
    isSearching: false,
    forMylist: false,
    forWatchedHistory: false,
});

// 現在のページ番号
const current_page = ref(props.page);

// 内部で管理するプログラムリスト
const displayPrograms = ref<IRecordedProgram[]>([...props.programs]);
// 内部で管理する合計数
const displayTotal = ref<number>(props.total);

// props の page が変更されたら current_page を更新
watch(() => props.page, (newPage) => {
    current_page.value = newPage;
});

// props の programs が変更されたら displayPrograms を更新
watch(() => props.programs, (newPrograms) => {
    displayPrograms.value = [...newPrograms];
});

// props の total が変更されたら displayTotal を更新
watch(() => props.total, (newTotal) => {
    displayTotal.value = newTotal;
});

// チャンネル名を抽出してソート
const channels = computed(() => {
    return [...new Set(displayPrograms.value
        .toSorted((a, b) => a.channel && b.channel ? a.channel.display_channel_id.localeCompare(b.channel.display_channel_id) : 0)
        .map(p => p.channel?.name))];
});

// 時間ラベルを生成
const timeLabels = computed(() => {
    if (displayPrograms.value.length === 0) return [];
    const startTime = displayPrograms.value.map(program => new Date(program.start_time)).reduce((a, b) => a < b ? a : b);
    const endTime = displayPrograms.value.map(program => new Date(program.end_time)).reduce((a, b) => a > b ? a : b);
    const labels: Date[] = [];
    for (let time = new Date(startTime.setMinutes(0, 0, 0)); time <= endTime; time.setHours(time.getHours() + 1)) {
        labels.push(new Date(time));
    }
    return labels;
});

// プログラムのクラス名を取得
const getClassName = (program: IRecordedProgram) => {
    switch (program.genres[0]?.major) {
        case 'スポーツ': return 'genre_sports';
        case 'ドラマ': return 'genre_drama';
        case '音楽': return 'genre_music';
        case '映画': return 'genre_movie';
        case 'アニメ・特撮': return 'genre_anime';
        default: return 'genre_none';
    }
};

const load = async ({ done }) => {
    if (current_page.value >= Math.ceil(displayTotal.value / 90)) {
        done('empty');
        return;
    }
    await props.updatePage(current_page.value + 1);
    done('ok');
};

</script>
<style lang="scss" scoped>

.past-timetable-grid{
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    background: rgb(var(--v-theme-background));

    &__grid {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
        height: 100vh;
        height: 100dvh;

        @include smartphone-horizontal {
            margin-top: 48px;
            font-size: 15px;
        }
        @include smartphone-vertical {
            margin-top: 14px;
            font-size: 14px;
        }

        &--loading {
            .past-timetable-grid__grid-content {
                visibility: hidden;
                opacity: 0;
            }
        }

        .past-timetable-grid__grid-content {
            height: 100%;
            transition: visibility 0.2s ease, opacity 0.2s ease;
        }
    }

    --channel-width: 150px;
    --channel-height: 34px;
    --time-width: 50px;
    --time-height-1hour: 300px;
    --time-height-1minute: calc(var(--time-height-1hour) / 60);

    @include smartphone-horizontal {
        --channel-width: 120px;
        --channel-height: 28px;
        --time-width: 50px;
    }

    @include smartphone-vertical {
        --channel-width: 100px;
        --channel-height: 24px;
        --time-width: 50px;
    }

    #epg-container {
        display: grid;
        grid-template-rows: var(--channel-height) 80px 1fr;
        grid-template-columns: var(--time-width) 1fr;
        width: 100%;
        height: 100%;
        overflow: auto;

        &::-webkit-scrollbar-track {
            background: transparent;
        }

        :deep(.v-infinite-scroll__side) {
            grid-row: 2;
            grid-column: 2;
            z-index: 1;
        }

        :deep(.v-infinite-scroll-intersect:nth-child(2)) {
            grid-row: 1;
            grid-column: 1 / -1;
        }
    }

    #channels {
        grid-row: 1;
        grid-column: 1 / -1;
        display: flex;
        position: sticky;
        top: 0;
        z-index: 2;

        .dummy,
        .channel-name {
            flex-shrink: 0;
            height: var(--channel-height);
            border-bottom: thin solid rgb(var(--v-theme-background-lighten-2));
            white-space: nowrap;
            overflow: hidden;
            background-color: rgb(var(--v-theme-background-lighten-1));
        }

        .dummy {
            position: sticky;
            left: 0;
            width: var(--time-width);
        }

        .channel-name {
            width: var(--channel-width);
            padding: 5px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            @include smartphone-horizontal {
                padding: 3px;
            }

            @include smartphone-vertical {
                padding: 3px;
            }
        }
    }

    #times {
        display: flex;
        flex-direction: column;
        grid-row: 3;
        position: sticky;
        left: 0;
        z-index: 1;
        width: var(--time-width);

        .time-label {
            position: sticky;
            top: var(--channel-height);
            overflow: hidden;
            height: var(--time-height-1hour);
            padding: 5px;
            background-color: rgb(var(--v-theme-background-lighten-1));
            font-size: 14px;
            text-align: center;

            .date {
                display: block;
                font-size: 10px;
                line-height: 1.2;
            }

            + .time-label {
                top: calc(var(--channel-height) - 1px);
                border-top: thin solid rgb(var(--v-theme-background-lighten-2));
            }

            @include smartphone-vertical {
                padding: 2px;
            }
        }
    }

    #schedule {
        display: grid;
        grid-template-rows: repeat(var(--minute-sum, auto-fill), var(--time-height-1minute));
        grid-template-columns: repeat(auto-fill, var(--channel-width));
        grid-row: 3;
        grid-column: 2;
        position: relative;

        .program {
            overflow: hidden;
            width: var(--channel-width);
            border: thin solid transparent;
            background-clip: padding-box;
            color: inherit;
            text-decoration: none;

            &:hover, &:focus {
                z-index: 0;
                min-height: fit-content;
                border: thin solid rgb(var(--v-theme-accent-darken-1));
            }

            &.genre_none{
                background-color: #484040;

                &:hover{
                    background-color: #574f4f;
                }
            }

            &.genre_sports{
                background-color: #5e6167;

                &:hover{
                    background-color: #6d5c6e;
                }
            }

            &.genre_drama{
                background-color: #43422e;

                &:hover{
                    background-color: #585745;
                }
            }

            &.genre_music{
                background-color: #242e1c;

                &:hover{
                    background-color: #37432d;
                }
            }

            &.genre_movie{
                background-color: #45293b;

                &:hover{
                    background-color: #6e4459;
                }
            }

            &.genre_anime{
                background-color: #393024;

                &:hover{
                    background-color: #5b4e37;
                }
            }

            .program-title {
                font-size: 0.9em;
            }

            .program-start-time {
                width: 1.6em;
                height: 1.6em;
                font-size: 0.9em;
                line-height: 1.6em;
                background-color: rgb(var(--v-theme-background-lighten-1));
                float: left;
                text-align: center;
            }

            .program-description {
                font-size: 0.8em;
                padding: 2px 4px;
                color: rgb(var(--v-theme-text-darken-2));
            }
        }
    }
}

</style>