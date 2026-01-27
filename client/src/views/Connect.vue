<template>
    <div class="route-container">
        <main>
            <div class="connect-container-wrapper d-flex align-center w-100 mb-13">
                <v-card class="connect-container px-10 pt-8 pb-11 mx-auto" elevation="10"
                    width="100%" max-width="450">
                    <v-card-title class="connect__logo py-4 d-flex flex-column justify-center align-center">
                        <img class="d-block" src="/assets/images/logo.svg" style="max-width: 250px;" />
                        <h4 class="mt-10">接続</h4>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-form ref="connect" @submit.prevent="connect">
                        <v-text-field class="mt-12" name="ipv4-host" color="primary" variant="outlined"
                            type="url" placeholder="ホスト" autofocus validate-on="submit"
                            pattern="^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(:[0-9]+)?$"
                            hint="IPv4のホストを入力してください。" persistent-hint
                            :rules="rules"
                            :density="is_form_dense ? 'compact' : 'default'"
                            v-model="host">
                        </v-text-field>
                        <v-btn type="submit" class="connect-button mt-5" color="secondary" variant="flat" width="100%" height="56"
                            :loading="is_validating" :disabled="is_validating">
                            <Icon icon="fa:sign-in" class="mr-2" />接続
                        </v-btn>
                    </v-form>
                </v-card>
            </div>
        </main>
    </div>
</template>
<script lang="ts">

import { mapStores } from 'pinia';
import { defineComponent } from 'vue';
import { VForm } from 'vuetify/components';

import Message from '@/message';
import Version from '@/services/Version';
import useVersionStore from '@/stores/VersionStore';
import Utils from '@/utils';

export default defineComponent({
    name: 'Connect',
    data() {
        return {

            // フォームを小さくするかどうか
            is_form_dense: Utils.isSmartphoneHorizontal(),
            // バリデーション中かどうか
            is_validating: false,
            host: '' as string,
            rules: [
                (value: string) => {
                    // ホストが空
                    if (value) return true;

                    return 'ホストが空です。';
                },
                (value: string) => {
                    // 形式が不適合
                    if (/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(:[0-9]+)?$/.test(value)) return true;

                    return 'IPv4のホストを入力してください。';
                },
                async (value: string) => {
                    // KonomiTVサーバーが起動していない

                    // 接続ホストを保存
                    Utils.saveApiHost(value);

                    if (await Version.fetchServerVersion(true) !== null) return true;

                    Utils.deleteApiHost();
                    return '接続先ホストはKonomiTVサーバーではありません。';
                },
            ],
        };
    },
    computed: {
        ...mapStores(useVersionStore),
    },
    mounted() {
        // ルーターから接続に失敗したホストが渡されていたら表示
        if (this.$route.query.failed_host) {
            this.host = this.$route.query.failed_host as string;
            Message.error('KonomiTVサーバーへの接続に失敗しました。ホスト設定を確認してください。');
            return;
        }
    },
    methods: {
        async connect() {

            // バリデーション開始
            this.is_validating = true;

            try {
                const validateResult =  await (this.$refs.connect as VForm).validate();

                if (!validateResult.valid) {
                    Message.error(validateResult.errors[0].errorMessages[0]);
                    return;
                }

                await this.versionStore.fetchServerVersion(true);
                if (this.versionStore.is_version_mismatch) {
                    Message.warning('このKonomiTVクライアントとKonomiTVサーバーのバージョンが異なるため、正常な動作が保証されません。');
                }
                // メインに遷移
                // ブラウザバックで接続ページに戻れないようにする
                // クエリパラメータをクリア
                await this.$router.replace({path: '/tv/', query: {}});
            } finally {
                // バリデーション終了
                this.is_validating = false;
            }
        },
    }
});

</script>
<style lang="scss" scoped>

.connect-container-wrapper {
    @include smartphone-horizontal {
        padding: 20px !important;
        margin-bottom: 0px !important;
    }
    @include smartphone-vertical {
        margin-bottom: 0px !important;
    }

    .connect-container {
        background: rgb(var(--v-theme-background-lighten-1)) !important;
        border-radius: 11px;
        @include smartphone-horizontal {
            padding: 24px !important;
        }
        @include smartphone-vertical {
            padding: 32px 20px !important;
            margin-left: 12px !important;
            margin-right: 12px !important;
        }

        .connect__logo {
            @include smartphone-horizontal {
                padding-top: 4px !important;
                padding-bottom: 8px !important;
                img {
                    max-width: 200px !important;
                }
                h4 {
                    margin-top: 16px !important;
                    font-size: 19px !important;
                }
            }
            @include smartphone-vertical {
                padding-top: 4px !important;
                padding-bottom: 12px !important;
                img {
                    max-width: 200px !important;
                }
                h4 {
                    margin-top: 24px !important;
                    font-size: 19px !important;
                }
            }
        }

        .v-input {
            @include smartphone-horizontal {
                margin-top: 24px !important;
                font-size: 14px !important;
            }
            @include smartphone-vertical {
                margin-top: 32px !important;
                font-size: 16px !important;
            }
        }

        .connect-button {
            border-radius: 7px;
            margin-top: 48px !important;
            font-size: 18px;
            letter-spacing: 0px;
            @include smartphone-horizontal {
                height: 44px !important;
                margin-top: 24px !important;
                font-size: 16px;
            }
            @include smartphone-vertical {
                height: 50px !important;
                margin-top: 32px !important;
                font-size: 15.5px;
            }
        }
    }
}

</style>