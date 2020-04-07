<template>
    <v-container grid-list-lg pa-0>
        <v-row wrap>
            <v-col cols="12" xs="12">
                <Breadcrumb :items="breadcrumbItems" layout-class="pl-3 pb-0" />
            </v-col>

            <v-col cols="12" md="12">
                <v-basic-card
                    :title="$t('label.system.annexConfig')"
                    toolbar-height="56"
                    icon="mdi-image-filter-black-white"
                >
                    <template slot="card-content">
                        <v-row wrap>
                            <v-col cols="12" md="3">
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-text-field
                                        v-model="blogUrl"
                                        label="最大上传文件数"
                                        class="pt-4"
                                        required
                                    ></v-text-field>

                                    <v-text-field
                                        v-model="blogUrl"
                                        label="同时上传文件数"
                                        class="pt-4"
                                        required
                                    ></v-text-field>

                                    <v-select v-model="model" :items="storageType" label="存储位置"> </v-select>

                                    <v-btn color="info" @click="reset">保存</v-btn>
                                </v-form>
                            </v-col>
                        </v-row>
                    </template>
                </v-basic-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Breadcrumb from '@/components/common/breadcrumbs'
export default {
    name: 'Annex',
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
                    text: this.$t('label.system.annexConfig'),
                    disabled: true
                }
            ],
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

            if (!isJPG) {
                console.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                console.error('上传头像图片大小不能超过 2MB!')
            }
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
