<template>
    <v-container grid-list-lg pa-0>
        <v-row wrap>
            <v-col cols="12" xs="12">
                <Breadcrumb :items="breadcrumbItems" layout-class="pl-3 pb-0" />
            </v-col>

            <v-col cols="12" md="12">
                <v-basic-card :title="$t('label.system.seoConfig')" toolbar-height="56" icon="mdi-saw-blade">
                    <template slot="card-content">
                        <v-row wrap>
                            <v-col cols="12" md="3">
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <p>屏蔽搜索引擎</p>

                                    <v-switch v-model="ex11" color="info" value="info" hide-details></v-switch>

                                    <v-text-field v-model="blogUrl" label="关键词" class="pt-4" required></v-text-field>

                                    <v-textarea name="input-7-1" label="博客描述" auto-grow value=""></v-textarea>

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
    name: 'Seo',
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
                    text: this.$t('label.system.seoConfig'),
                    disabled: true
                }
            ],
            valid: true,
            blogTitle: '',
            logoUrl: ''
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
