<template>
    <!--    <v-container id="index" grid-list-xl grid-list-lg grid-list-md grid-list-sm grid-list-xs>-->
    <v-container id="index" fluid>
        <v-row wrap>
            <v-col cols="12" sm="6" md="3">
                <v-card dark class="index-card colored emerald-bg">
                    <div class="d-flex flex-no-wrap justify-space-between">
                        <v-card
                            dark
                            flat
                            color="#FFF"
                            class="ma-3"
                            style="max-height: 85px; max-width: 85px; line-height: 85px; background-color: transparent"
                        >
                            <v-icon size="85">mdi-account</v-icon>
                        </v-card>
                        <div class="text-xs-right pa-3">
                            <v-card-title class="subtitle-1">文章数</v-card-title>
                            <v-card-subtitle class="headline">666</v-card-subtitle>
                        </div>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <v-card dark class="index-card colored green-bg">
                    <div class="d-flex flex-no-wrap justify-space-between">
                        <v-card
                            dark
                            flat
                            color="#FFF"
                            class="ma-3"
                            style="max-height: 85px; max-width: 85px; line-height: 85px; background-color: transparent"
                        >
                            <v-icon size="85">mdi-comment-processing</v-icon>
                        </v-card>
                        <div class="text-xs-right pa-3">
                            <v-card-title class="subtitle-1">评论数</v-card-title>
                            <v-card-subtitle class="headline">666</v-card-subtitle>
                        </div>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <v-card dark class="index-card colored red-bg">
                    <div class="d-flex flex-no-wrap justify-space-between">
                        <v-card
                            dark
                            flat
                            color="#FFF"
                            class="ma-3"
                            style="max-height: 85px; max-width: 85px; line-height: 85px; background-color: transparent"
                        >
                            <v-icon size="85">mdi-chart-areaspline-variant</v-icon>
                        </v-card>
                        <div class="text-xs-right pa-3">
                            <v-card-title class="subtitle-1">访问数</v-card-title>
                            <v-card-subtitle class="headline">666</v-card-subtitle>
                        </div>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <v-card dark class="index-card colored purple-bg">
                    <div class="d-flex flex-no-wrap justify-space-between">
                        <v-card
                            dark
                            flat
                            color="#FFF"
                            class="ma-3"
                            style="max-height: 85px; max-width: 85px; line-height: 85px; background-color: transparent"
                        >
                            <v-icon size="85">mdi-wrench</v-icon>
                        </v-card>
                        <div class="text-xs-right pa-3">
                            <v-card-title class="subtitle-1">已建立</v-card-title>
                            <v-card-subtitle class="headline">365</v-card-subtitle>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <!--<v-row>
            <v-col cols="12" sm="6" md="4">
                <v-card class="index-tab">
                    <v-tabs v-model="tab" background-color="#F9F9F9" color="basil" grow>
                        <v-tabs-slider color="#03a9f4"></v-tabs-slider>
                        <v-tab v-for="item in items" :key="item">
                            {{ item }}
                        </v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tab">
                        <v-tab-item key="article">
                            <v-card flat color="basil">
                                &lt;!&ndash;                                <v-card-text>111</v-card-text>&ndash;&gt;
                                <v-list two-line>
                                    <template v-for="(item, index) in articleList">
                                        <v-list-item :key="item.text">
                                            <v-list-item-avatar>
                                                <v-icon class="emerald-bg lighten-1 white&#45;&#45;text"
                                                    >mdi-file-document-box-outline</v-icon
                                                >
                                            </v-list-item-avatar>

                                            <v-list-item-content>
                                                <v-list-item-title v-text="item.title"></v-list-item-title>
                                                <v-list-item-subtitle v-text="item.dateTime"></v-list-item-subtitle>
                                            </v-list-item-content>

                                            <v-list-item-action>
                                                <v-btn icon>
                                                    <v-icon color="grey lighten-1">mdi-subdirectory-arrow-right</v-icon>
                                                </v-btn>
                                            </v-list-item-action>
                                        </v-list-item>
                                        <v-divider v-if="index != articleList.length - 1"></v-divider>
                                    </template>
                                </v-list>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item key="comment">
                            <v-card flat color="basil">
                                <v-list two-line>
                                    <template v-for="(item, index) in commentList">
                                        <v-list-item :key="item.text">
                                            <v-list-item-avatar>
                                                <v-icon class="emerald-bg lighten-1 white&#45;&#45;text"
                                                    >mdi-comment-text-multiple-outline</v-icon
                                                >
                                            </v-list-item-avatar>

                                            <v-list-item-content>
                                                <v-list-item-title v-text="item.title"></v-list-item-title>
                                                <v-list-item-subtitle v-text="item.content"></v-list-item-subtitle>
                                            </v-list-item-content>

                                            <v-list-item-action>
                                                &lt;!&ndash;<v-btn icon>
                                                    <v-icon color="grey lighten-1">mdi-subdirectory-arrow-right</v-icon>
                                                </v-btn>&ndash;&gt;
                                                <v-list-item-subtitle v-text="item.dateTime"></v-list-item-subtitle>
                                            </v-list-item-action>
                                        </v-list-item>
                                        <v-divider v-if="index != articleList.length - 1"></v-divider>
                                    </template>
                                </v-list>
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card>
                    <v-subheader>操作日志</v-subheader>
                    <v-list two-line>
                        <template v-for="(item, index) in operating">
                            <v-list-item :key="item.title">
                                <v-list-item-avatar>
                                    &lt;!&ndash;                                <v-icon class="emerald-bg lighten-1 white&#45;&#45;text"&ndash;&gt;
                                    <v-icon :class="getOperateIconColor(item.type) + ' lighten-1 white&#45;&#45;text'"
                                        >mdi-{{ getOperateIcon(item.type) }}</v-icon
                                    >
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title v-text="item.title"></v-list-item-title>
                                    <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                    &lt;!&ndash;<v-btn icon>
                                <v-icon color="grey lighten-1">mdi-subdirectory-arrow-right</v-icon>
                            </v-btn>&ndash;&gt;
                                    <v-list-item-subtitle v-text="item.operator"></v-list-item-subtitle>
                                </v-list-item-action>
                            </v-list-item>
                            <v-divider v-if="index != operating.length - 1"></v-divider>
                        </template>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>-->
        <v-row>
            <v-col cols="12" md="12">
                <v-card class="index-tab">
                    <v-tabs v-model="tab" background-color="#F9F9F9" color="basil">
                        <v-tabs-slider color="#03a9f4"></v-tabs-slider>
                        <v-tab v-for="item in items" :key="item">
                            {{ item }}
                        </v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tab">
                        <v-tab-item key="ga">
                            <v-row>
                                <v-col cols="12" md="3">
                                    <v-card class="ma-4">
                                        <apexchart
                                            :options="country.chartOptions"
                                            :series="country.series"
                                            type="pie"
                                        ></apexchart>
                                    </v-card>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-card class="ma-4">
                                        <apexchart
                                            :options="city.chartOptions"
                                            :series="city.series"
                                            type="pie"
                                        ></apexchart>
                                    </v-card>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-card class="ma-4">
                                        <apexchart
                                            :options="browser.chartOptions"
                                            :series="browser.series"
                                            type="pie"
                                        ></apexchart>
                                    </v-card>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-card class="ma-4">
                                        <apexchart
                                            :options="os.chartOptions"
                                            :series="os.series"
                                            type="pie"
                                        ></apexchart>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-tab-item>
                        <v-tab-item key="baidu">
                            <v-card flat color="basil">
                                <v-list two-line>
                                    <template v-for="(item, index) in commentList">
                                        <v-list-item :key="item.text">
                                            <v-list-item-avatar>
                                                <v-icon class="emerald-bg lighten-1 white&#45;&#45;text"
                                                    >mdi-comment-text-multiple-outline</v-icon
                                                >
                                            </v-list-item-avatar>

                                            <v-list-item-content>
                                                <v-list-item-title v-text="item.title"></v-list-item-title>
                                                <v-list-item-subtitle v-text="item.content"></v-list-item-subtitle>
                                            </v-list-item-content>

                                            <v-list-item-action>
                                                <v-btn icon>
                                                    <v-icon color="grey lighten-1">mdi-subdirectory-arrow-right</v-icon>
                                                </v-btn>
                                                <v-list-item-subtitle v-text="item.dateTime"></v-list-item-subtitle>
                                            </v-list-item-action>
                                        </v-list-item>
                                        <v-divider v-if="index != articleList.length - 1"></v-divider>
                                    </template>
                                </v-list>
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import drawerJs from '~/assets/js/common/drawer'

export default {
    name: 'Index',
    layout: 'frame',
    data() {
        return {
            breadcrumbs: '',
            list: {
                0: false,
                1: false,
                2: false
            },
            tab: null,
            items: ['GA今日统计', '百度今日统计'],
            articleList: [
                {
                    title: '第1篇文章',
                    dateTime: '2020-01-15 15:25:25'
                },
                {
                    title: '第2篇文章',
                    dateTime: '2020-01-14 15:25:25'
                },
                {
                    title: '第3篇文章',
                    dateTime: '2020-01-13 15:25:25'
                },
                {
                    title: '第4篇文章',
                    dateTime: '2020-01-12 15:25:25'
                },
                {
                    title: '第5篇文章',
                    dateTime: '2020-01-11 15:25:25'
                }
            ],
            commentList: [
                {
                    title: '第1篇文章',
                    content: '文章写得真不错',
                    dateTime: '2020-01-15 15:25:25'
                },
                {
                    title: '第2篇文章',
                    content: '文章写得真不错',
                    dateTime: '2020-01-14 15:25:25'
                },
                {
                    title: '第3篇文章',
                    content: '文章写得真不错',
                    dateTime: '2020-01-13 15:25:25'
                },
                {
                    title: '第4篇文章',
                    content: '文章写得真不错',
                    dateTime: '2020-01-12 15:25:25'
                },
                {
                    title: '第5篇文章',
                    content: '文章写得真不错',
                    dateTime: '2020-01-11 15:25:25'
                }
            ],
            operating: [
                {
                    title: '文章删除',
                    subtitle: '1分钟前',
                    operator: 'ye21st',
                    type: 'del'
                },
                {
                    title: '文章修改',
                    subtitle: '1分钟前',
                    operator: 'ye21st',
                    type: 'edit'
                },
                {
                    title: '管理员登录',
                    subtitle: '1分钟前',
                    operator: 'ye21st',
                    type: 'login'
                },
                {
                    title: '添加文章',
                    subtitle: '1分钟前',
                    operator: 'ye21st',
                    type: 'add'
                },
                {
                    title: '修改网站配置',
                    subtitle: '1分钟前',
                    operator: 'ye21st',
                    type: 'edit'
                }
            ],
            systemInfo: [
                {
                    icon: 'plus',
                    title: '系统版本',
                    value: 'V0.0.1'
                },
                {
                    icon: 'plus',
                    title: '前端框架',
                    value: 'Nuxt 2.11.0 +  Vuetify 2.0'
                },
                {
                    icon: 'plus',
                    title: '后台框架',
                    value: 'SpringBoot 2.1.7'
                }
            ],
            country: {
                series: [44, 55, 43, 22],
                chartOptions: {
                    chart: {
                        type: 'pie'
                    },
                    labels: ['中国', '美国', '法国', '日本'],
                    legend: {
                        height: '100%',
                        position: 'bottom'
                    },
                    title: {
                        text: '国家',
                        align: 'center'
                    }
                }
            },
            city: {
                series: [44, 55, 43, 22],
                chartOptions: {
                    chart: {
                        type: 'pie'
                    },
                    labels: ['深圳', '北京', '上海', '广州'],
                    legend: {
                        height: '100%',
                        position: 'bottom'
                    },
                    title: {
                        text: '城市',
                        align: 'center'
                    }
                }
            },
            browser: {
                series: [44, 55, 43, 22],
                chartOptions: {
                    chart: {
                        type: 'pie'
                    },
                    labels: ['Chrome', 'FireFox', '360极速浏览器', 'Safari'],
                    legend: {
                        height: '100%',
                        position: 'bottom'
                    },
                    title: {
                        text: '浏览器',
                        align: 'center'
                    }
                }
            },
            os: {
                series: [44, 55, 43],
                chartOptions: {
                    chart: {
                        type: 'pie'
                    },
                    labels: ['Windows', 'MacOS', 'Linux'],
                    legend: {
                        height: '100%',
                        position: 'bottom'
                    },
                    title: {
                        text: '操作系统',
                        align: 'center'
                    }
                }
            }
        }
    },
    mounted() {
        const self = this
        self.breadcrumbsText(self.$t('label.title.controlPanel'))
    },
    methods: {
        breadcrumbsText(text) {
            drawerJs.$emit('breadcrumbsEvent', text)
        },
        getOperateIconColor(type) {
            let color = ''
            if (type === 'edit') {
                color = 'emerald-bg'
            } else if (type === 'add' || type === 'login') {
                color = 'green-bg'
            } else if (type === 'del') {
                color = 'red-bg'
            }
            return color
        },
        getOperateIcon(type) {
            let icon = ''
            if (type === 'add') {
                icon = 'plus'
            } else if (type === 'edit') {
                icon = 'square-edit-outline'
            } else if (type === 'del') {
                icon = 'trash-can'
            } else {
                icon = 'settings-outline'
            }
            return icon
        },
        generateDayWiseTimeSeries(baseval, count, yrange) {
            let i = 0
            const series = []
            while (i < count) {
                const x = baseval
                const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
                series.push([x, y])
                baseval += 86400000
                i++
            }
            return series
        },
        updateChart() {
            this.series = [
                {
                    name: 'South',
                    data: this.generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
                        min: 10,
                        max: 60
                    })
                },
                {
                    name: 'North',
                    data: this.generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
                        min: 10,
                        max: 20
                    })
                },

                {
                    name: 'Central',
                    data: this.generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
                        min: 10,
                        max: 15
                    })
                }
            ]
        }
    }
}
</script>

<style lang="scss">
@import '~assets/styles/index/index.scss';
</style>
