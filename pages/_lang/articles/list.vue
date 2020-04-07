<template>
    <v-container grid-list-lg pa-0>
        <v-row wrap>
            <v-col cols="12" xs="12">
                <Breadcrumb :items="breadcrumbItems" layout-class="pl-3 pb-0" />
            </v-col>

            <v-col cols="12" md="12">
                <v-basic-card :title="$t('label.articles.all')" toolbar-height="56" icon="mdi-text-box-outline">
                    <template slot="card-content">
                        <v-row wrap>
                            <v-col cols="12">
                                <v-data-table
                                    :headers="tableHeaders"
                                    :items="articlesList"
                                    :options.sync="dataTableOptions"
                                    :server-items-length="articlesListTotal"
                                    :loading="loading"
                                    height="540"
                                >
                                    <template v-slot:top>
                                        <v-row class="pl-4 pr-4">
                                            <v-col cols="12" md="3">
                                                <v-text-field
                                                    v-model="keywords"
                                                    label="关键词"
                                                    prepend-icon="mdi-account"
                                                    clearable
                                                ></v-text-field>
                                            </v-col>

                                            <v-col cols="12" md="3">
                                                <v-select
                                                    v-model="articleType"
                                                    :items="articleTypeList"
                                                    label="文章状态"
                                                >
                                                </v-select>
                                            </v-col>

                                            <v-col cols="12" md="3">
                                                <v-select
                                                    v-model="categoriesType"
                                                    :items="categoriesTypeList"
                                                    label="分类目录"
                                                ></v-select>
                                            </v-col>

                                            <v-col cols="12" md="2">
                                                <v-btn @click="search()" class="ma-2" tile color="info">
                                                    <v-icon left>mdi-magnify</v-icon> {{ $t('label.common.search') }}
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                        <v-row class="pl-2 pr-4" no-gutters>
                                            <v-col cols="12" md="2">
                                                <v-btn
                                                    :href="$i18n.path('/articles/list')"
                                                    class="ma-2"
                                                    tile
                                                    color="info"
                                                >
                                                    <v-icon left>mdi-plus</v-icon> 添加新文章
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </template>
                                    <template v-slot:item.index="{ item }">
                                        {{
                                            (pageTo - 1) * 10 +
                                                (articlesList
                                                    .map(function(x) {
                                                        return x.id
                                                    })
                                                    .indexOf(item.id) +
                                                    1)
                                        }}
                                    </template>
                                </v-data-table>
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
    name: 'ArticlesIndex',
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
                    text: this.$t('label.articles.all'),
                    disabled: true
                }
            ],
            keywords: '',
            articleType: '',
            articleTypeList: ['已发布', '草稿', '回收站', '私密'],
            categoriesType: '',
            categoriesTypeList: ['测试', '已发布'],
            loading: false,
            dataTableOptions: {},
            tableHeaders: [],
            articlesList: [],
            articlesListTotal: 0
        }
    },
    computed: {},
    watch: {
        dataTableOptions: {
            handler() {
                this.getArticlesList()
            },
            deep: true
        }
    },
    mounted() {
        const self = this

        // 初始化表格头部
        self.tableHeaders = [
            {
                text: '标题',
                align: 'center',
                value: 'title'
            },
            {
                text: '状态',
                align: 'center',
                value: 'status'
            },
            {
                text: '分类',
                align: 'center',
                value: 'category'
            },
            {
                text: '标签',
                align: 'center',
                value: 'tag'
            },
            {
                text: '评论',
                align: 'center',
                value: 'comment'
            },
            {
                text: '访问',
                align: 'center',
                value: 'access'
            },
            {
                text: '发布时间',
                align: 'center',
                value: 'releaseTime'
            },
            {
                text: '操作',
                value: 'action'
            }
        ]

        self.getArticlesList()
    },
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
        },
        getArticlesList() {
            const self = this
            self.loading = true
            const { sortBy, sortDesc, page, itemsPerPage } = self.dataTableOptions
            self.pageTo = page
            self.pageSize = itemsPerPage

            self.articlesList = [
                {
                    title: '测试文章1',
                    status: '已发布',
                    category: 'Java',
                    tag: 'SpringBoot',
                    comment: 1,
                    access: 100,
                    releaseTime: '2020-04-07 17:34:01'
                }
            ]

            self.articlesListTotal = self.articlesList.length
            if (sortBy.length === 1 && sortDesc.length === 1) {
                self.articlesList = self.articlesList.sort((a, b) => {
                    const sortA = a[sortBy[0]]
                    const sortB = b[sortBy[0]]

                    if (sortDesc[0]) {
                        if (sortA < sortB) return 1
                        if (sortA > sortB) return -1
                        return 0
                    } else {
                        if (sortA < sortB) return -1
                        if (sortA > sortB) return 1
                        return 0
                    }
                })
            }
            setTimeout(() => {
                self.loading = false
            }, 1000)
        }
    }
}
</script>

<style lang="scss">
@import '~assets/styles/admin/index.scss';
</style>
