<template>
    <v-container grid-list-lg pa-0>
        <v-row wrap>
            <v-col cols="12" xs="12">
                <Breadcrumb :items="breadcrumbItems" layout-class="pl-3 pb-0" />
            </v-col>

            <v-col cols="12" md="12">
                <v-basic-card :title="$t('label.system.smtpConfig')" toolbar-height="56" icon="mdi-email-outline">
                    <template slot="card-content">
                        <v-tabs v-model="tab" color="primary">
                            <v-tabs-slider></v-tabs-slider>

                            <v-tab key="smtpConfig" href="#tab-1">发信设置</v-tab>
                            <v-tab key="sendTest" href="#tab-2">发送测试</v-tab>

                            <v-tab-item key="smtpConfig" value="tab-1">
                                <v-card flat tile>
                                    <v-card-text>
                                        <v-row wrap>
                                            <v-col cols="12" md="3">
                                                <v-form ref="form" v-model="valid" lazy-validation>
                                                    <p>是否启用</p>

                                                    <v-switch
                                                        v-model="ex11"
                                                        color="info"
                                                        value="info"
                                                        hide-details
                                                    ></v-switch>

                                                    <v-text-field
                                                        v-model="blogUrl"
                                                        label="SMTP 地址"
                                                        class="pt-4"
                                                        required
                                                    ></v-text-field>

                                                    <v-text-field
                                                        v-model="blogUrl"
                                                        label="发送协议"
                                                        class="pt-4"
                                                        required
                                                    ></v-text-field>

                                                    <v-text-field
                                                        v-model="blogUrl"
                                                        label="SSL 端口"
                                                        class="pt-4"
                                                        required
                                                    ></v-text-field>

                                                    <v-text-field
                                                        v-model="blogUrl"
                                                        label="邮箱账号"
                                                        class="pt-4"
                                                        required
                                                    ></v-text-field>

                                                    <v-text-field
                                                        v-model="blogUrl"
                                                        label="邮箱密码"
                                                        class="pt-4"
                                                        required
                                                    ></v-text-field>

                                                    <v-text-field
                                                        v-model="blogUrl"
                                                        label="发件人"
                                                        class="pt-4"
                                                        required
                                                    ></v-text-field>

                                                    <v-btn @click="reset" color="info">保存</v-btn>
                                                </v-form>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>

                            <v-tab-item key="sendTest" value="tab-2">
                                <v-card flat tile>
                                    <v-card-text>
                                        <v-row wrap>
                                            <v-col cols="12" md="3">
                                                <v-form ref="form" v-model="valid" lazy-validation>
                                                    <v-text-field
                                                        v-model="blogUrl"
                                                        label="收件人"
                                                        class="pt-4"
                                                        required
                                                    ></v-text-field>

                                                    <v-text-field
                                                        v-model="blogUrl"
                                                        label="主题"
                                                        class="pt-4"
                                                        required
                                                    ></v-text-field>

                                                    <v-textarea
                                                        name="input-7-1"
                                                        label="内容"
                                                        auto-grow
                                                        value=""
                                                    ></v-textarea>

                                                    <v-btn @click="reset" color="info">保存</v-btn>
                                                </v-form>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                        </v-tabs>
                    </template>
                </v-basic-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Breadcrumb from '@/components/common/breadcrumbs'
export default {
    name: 'Smtp',
    layout: 'frame',
    components: {
        Breadcrumb
    },
    data() {
        return {
            breadcrumbItems: [
                {
                    text: this.$t('label.title.home'),
                    disabled: false,
                    href: this.$i18n.path('/')
                },
                {
                    text: this.$t('label.title.systemSetting'),
                    disabled: true
                },
                {
                    text: this.$t('label.system.smtpConfig'),
                    disabled: true
                }
            ],
            tab: null,
            tabs: 3,
            text:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            valid: true,
            blogTitle: '',
            logoUrl: '',
            storageType: ['本地', '七牛云', '阿里云', '腾讯云'],
            model: '本地'
        }
    },
    computed: {},
    watch: {},
    mounted() {},
    methods: {
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw)
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/png'
            const isLt2M = file.size / 1024 / 1024 < 2
            return isJPG && isLt2M
        }
    }
}
</script>

<style lang="scss">
@import '~assets/styles/admin/index.scss';
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
