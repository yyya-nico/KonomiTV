<template>
    <div class="past-epg-viewer">
        <div class="past-epg-viewer__header" v-if="!hideHeader">
            <h2 class="past-epg-viewer__title">
                <div v-if="showBackButton" v-ripple class="past-epg-viewer__title-back" @click="$router.back()">
                    <Icon icon="fluent:chevron-left-12-filled" width="27px" />
                </div>
                <span class="past-epg-viewer__title-text">{{title}}</span>
            </h2>
        </div>
        <div class="past-epg-viewer__pagination" v-if="!hidePagination && displayTotal > 0">
            <v-pagination
                v-model="current_page"
                active-color="primary"
                density="comfortable"
                :length="Math.ceil(displayTotal / 90)"
                :total-visible="7"
                @update:model-value="$emit('update:page', $event)">
            </v-pagination>
        </div>
        <div class="past-epg-viewer__grid"
            :class="{
                'past-epg-viewer__grid--loading': isLoading,
                'past-epg-viewer__grid--empty': displayTotal === 0 && showEmptyMessage
            }">
            <div class="past-epg-viewer__empty"
                :class="{
                    'past-epg-viewer__empty--show': displayTotal === 0 && showEmptyMessage,
                }">
                <div class="past-epg-viewer__empty-content">
                    <Icon class="past-epg-viewer__empty-icon" :icon="emptyIcon" width="54px" height="54px" />
                    <h2 v-html="emptyMessage"></h2>
                    <div class="past-epg-viewer__empty-submessage"
                        v-if="emptySubMessage" v-html="emptySubMessage"></div>
                </div>
            </div>
            <div class="past-epg-viewer__grid-content">
                <div id="epg-container">
                    <div id="channels">
                        <div class="dummy"></div>
                        <div v-for="channel in channels" :key="channel" class="channel-name">
                            {{ channel }}
                        </div>
                    </div>
                    <div id="times">
                        <div v-for="(time, i) in timeLabels" :key="i" class="time-label">
                            {{ time.getHours() === 0 || i === 0
                                ? time.toLocaleString([], { month: 'numeric', day: 'numeric', weekday: 'short', hour: 'numeric' })
                                : time.toLocaleTimeString([], { hour: 'numeric' }) }}
                        </div>
                    </div>
                    <div id="schedule">
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
                </div>
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
    title: string;
    programs: IRecordedProgram[];
    total: number;
    page?: number;
    hideHeader?: boolean;
    hidePagination?: boolean;
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
    hidePagination: false,
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

// Emits
defineEmits<{
    (e: 'update:page', page: number): void;
}>();

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

// 録画ファイルが削除された時の処理
const handleProgramDeleted = (id: number) => {
    // 内部のプログラムリストから削除されたプログラムを除外
    displayPrograms.value = displayPrograms.value.filter(program => program.id !== id);
    // 合計数を1減らす
    displayTotal.value--;
};

// チャンネル名を抽出してソート
const channels = computed(() => {
    return [...new Set(displayPrograms.value
        .toSorted((a, b) => a.channel && b.channel ? a.channel.remocon_id - b.channel.remocon_id : 0)
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
</script>
<style lang="scss" scoped>

.past-epg-viewer {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    &__header {
        display: flex;
        align-items: center;
        @include smartphone-vertical {
            padding: 0px 8px;
        }
    }

    &__title {
        display: flex;
        align-items: center;
        position: relative;
        font-size: 24px;
        font-weight: 700;
        padding-top: 8px;
        padding-bottom: 20px;
        @include smartphone-vertical {
            font-size: 22px;
            padding-bottom: 16px;
        }

        &-back {
            display: none;
            position: absolute;
            left: -8px;
            padding: 6px;
            border-radius: 50%;
            color: rgb(var(--v-theme-text));
            cursor: pointer;
            @include smartphone-vertical {
                display: flex;
            }

            & + .past-epg-viewer__title-text {
                @include smartphone-vertical {
                    margin-left: 32px;
                }
            }
        }
    }

    &__grid {
        display: flex;
        flex-direction: column;
        position: relative;
        width: fit-content;
        max-width: 100%;
        --constant-height: 270px;
        height: calc(100vh - var(--constant-height));
        background-color: rgb(var(--v-theme-background-lighten-1));
        border-radius: 8px;
        overflow: clip;

        @include smartphone-horizontal {
            --constant-height: 195px;
            font-size: 15px;
        }
        @include smartphone-vertical {
            --constant-height: 215px;
            font-size: 14px;
        }

        &--loading {
            .past-epg-viewer__grid-content {
                visibility: hidden;
                opacity: 0;
            }
        }
        &--empty {
            height: 100%;
            min-height: 200px;
        }

        .past-epg-viewer__grid-content {
            height: 100%;
            transition: visibility 0.2s ease, opacity 0.2s ease;
        }
    }

    &__pagination {
        display: flex;
        justify-content: center;
        margin-bottom: 24px;
        @include smartphone-vertical {
            margin-bottom: 20px;
        }
    }

    &__empty {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 28px;
        padding-bottom: 40px;
        flex-grow: 1;
        visibility: hidden;
        opacity: 0;
        transition: visibility 0.2s ease, opacity 0.2s ease;

        &--show {
            visibility: visible;
            opacity: 1;
        }

        &-content {
            text-align: center;

            .past-epg-viewer__empty-icon {
                color: rgb(var(--v-theme-text-darken-1));
            }

            h2 {
                font-size: 21px;
                @include tablet-vertical {
                    font-size: 19px !important;
                }
                @include smartphone-horizontal {
                    font-size: 19px !important;
                }
                @include smartphone-horizontal-short {
                    font-size: 19px !important;
                }
                @include smartphone-vertical {
                    font-size: 19px !important;
                    text-align: center;
                }
            }

            .past-epg-viewer__empty-submessage {
                margin-top: 8px;
                color: rgb(var(--v-theme-text-darken-1));
                font-size: 15px;
                @include tablet-vertical {
                    font-size: 13px !important;
                    text-align: center;
                }
                @include smartphone-horizontal {
                    font-size: 13px !important;
                    text-align: center;
                }
                @include smartphone-vertical {
                    font-size: 13px !important;
                    text-align: center;
                    margin-top: 7px !important;
                    line-height: 1.65;
                }
            }
        }
    }

    --channel-width: 150px;
    --channel-height: 34px;
    --time-width: 70px;
    --time-height-1hour: calc(300px - 0.25px);
    --time-height-1minute: calc((var(--time-height-1hour) - 59px) / 60);

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
        grid-template-rows: var(--channel-height) 1fr;
        grid-template-columns: var(--time-width) 1fr;
        gap: 1px;
        width: fit-content;
        height: 100%;
        max-width: 100%;
        overflow: auto;

        &::-webkit-scrollbar-track {
            background: transparent;
        }
    }

    #channels {
        grid-column: 1 / -1;
        display: flex;
        gap: 1px;
        position: sticky;
        top: 0;
        z-index: 2;

        .dummy,
        .channel-name {
            flex-shrink: 0;
            height: var(--channel-height);
            border-bottom: thin solid rgb(var(--v-theme-background-lighten-2));
            text-wrap: nowrap;
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
        gap: 1px;
        position: sticky;
        left: 0;
        z-index: 1;
        width: var(--time-width);

        .time-label {
            position: sticky;
            top: calc(var(--channel-height) + 1px);
            overflow: hidden;
            height: var(--time-height-1hour);
            padding: 5px;
            border-top: thin solid rgb(var(--v-theme-background-lighten-2));
            background-color: rgb(var(--v-theme-background-lighten-1));
            font-size: 14px;
            text-align: center;

            @include smartphone-horizontal {
                font-size: 12px;
            }

            @include smartphone-vertical {
                padding: 2px;
                font-size: 10px;
            }
        }
    }

    #schedule {
        display: grid;
        grid-template-rows: repeat(auto-fill, var(--time-height-1minute));
        grid-template-columns: repeat(auto-fill, var(--channel-width));
        gap: 1px;
        position: relative;
        background-color: rgb(var(--v-theme-background-lighten-1));

        .program {
            overflow: hidden;
            width: var(--channel-width);
            color: inherit;
            text-decoration: none;

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