<template>
    <v-container grid-list-lg pa-0>
        <v-row wrap>
            <v-col cols="12" xs="12">
                <Breadcrumb :items="breadcrumbItems" layout-class="pl-3 pb-0" />
            </v-col>

            <v-col cols="12" md="12">
                <v-basic-card :title="$t('label.system.basicConfig')" toolbar-height="56" icon="mdi-wrench-outline">
                    <template slot="card-content">
                        <v-row wrap>
                            <v-col cols="12" md="3">
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-text-field
                                        v-model="blogTitle"
                                        :label="$t('label.system.blogTitle')"
                                    ></v-text-field>

                                    <v-text-field
                                        v-model="blogUrl"
                                        :label="$t('label.system.blogAddress')"
                                    ></v-text-field>

                                    <v-list two-line>
                                        <v-list-item class="px-0">
                                            <v-list-item-content>
                                                <v-list-item-title>Logo</v-list-item-title>
                                                <v-list-item-subtitle>
                                                    <el-upload
                                                        :show-file-list="false"
                                                        :on-success="handleAvatarSuccess"
                                                        :before-upload="beforeAvatarUpload"
                                                        class="avatar-uploader"
                                                        action="https://jsonplaceholder.typicode.com/posts/"
                                                    >
                                                        <img v-if="logoUrl" :src="logoUrl" class="avatar" />
                                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                    </el-upload>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>

                                    <v-text-field
                                        v-model="websiteRecordNumber"
                                        :label="$t('label.system.websiteRecordNumber')"
                                    ></v-text-field>

                                    <v-text-field
                                        v-model="websiteCopyright"
                                        :label="$t('label.system.websiteCopyright')"
                                    ></v-text-field>

                                    <v-btn color="info">{{ $t('label.common.save') }}</v-btn>
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
    name: 'Basic',
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
                    text: this.$t('label.system.basicConfig'),
                    disabled: true
                }
            ],
            valid: true,
            blogTitle: '',
            blogUrl: '',
            logoUrl: '',
            websiteRecordNumber: '',
            websiteCopyright: ''
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
