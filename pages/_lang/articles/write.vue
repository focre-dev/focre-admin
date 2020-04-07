<template>
    <v-container grid-list-lg pa-0>
        <v-row wrap>
            <v-col cols="12" xs="12">
                <Breadcrumb :items="breadcrumbItems" layout-class="pl-3 pb-0" />
            </v-col>

            <v-col cols="12" md="12">
                <v-basic-card :title="$t('label.articles.write')" toolbar-height="56" icon="mdi-pencil-outline">
                    <template slot="card-content">
                        <v-row wrap>
                            <v-col cols="12" md="3">
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-text-field v-model="blogTitle" label="博客标题" required></v-text-field>

                                    <v-text-field v-model="blogUrl" label="博客地址" required></v-text-field>

                                    <v-list two-line>
                                        <v-list-item class="px-0">
                                            <v-list-item-content>
                                                <v-list-item-title>Logo</v-list-item-title>
                                                <v-list-item-subtitle>
                                                    <el-upload
                                                        class="avatar-uploader"
                                                        action="https://jsonplaceholder.typicode.com/posts/"
                                                        :show-file-list="false"
                                                        :on-success="handleAvatarSuccess"
                                                        :before-upload="beforeAvatarUpload"
                                                    >
                                                        <img v-if="logoUrl" :src="logoUrl" class="avatar" />
                                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                    </el-upload>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>

                                    <v-text-field
                                        v-model="webSiteRecordNumber"
                                        label="网站备案号"
                                        required
                                    ></v-text-field>

                                    <v-text-field
                                        v-model="webSiteCopyright"
                                        label="网站版权说明"
                                        required
                                    ></v-text-field>

                                    <v-btn color="info">保存</v-btn>
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
    name: 'ArticlesWrite',
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
                    text: this.$t('label.title.article'),
                    disabled: true
                },
                {
                    text: this.$t('label.articles.write'),
                    disabled: true
                }
            ],
            valid: true,
            blogTitle: '',
            blogUrl: '',
            logoUrl: '',
            webSiteRecordNumber: '',
            webSiteCopyright: ''
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
