<template>
    <div>
        <v-navigation-drawer
            v-model="drawer"
            style="background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/images/sidebar/sidebar-1.jpg')"
            dark
            app
        >
            <v-list dense class="sidebar-box">
                <v-list-item two-line class="sidebar-logo">
                    <v-list-item-content>
                        <v-list-item-title class="text-uppercase font-weight-regular title text-center">
                            <span>Focre</span>
                            <span>Admin</span>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list subheader>
                    <v-list-group
                        v-if="userInfo.children"
                        :key="userInfo.text"
                        v-model="userInfo.model"
                        :append-icon="userInfo.model ? userInfo.icon : userInfo['icon-alt']"
                    >
                        <template v-slot:activator>
                            <v-list-item-avatar>
                                <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
                            </v-list-item-avatar>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ userInfo.text }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        <v-list-item v-for="(child, i) in userInfo.children" :key="i" link>
                            <v-list-item-icon style="margin-left: 10px">
                                {{ child.icon }}
                            </v-list-item-icon>
                            <!--                            <div class="v-list-item__icon v-list-item__icon&#45;&#45;text">MP</div>-->
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ child.text }}
                                </v-list-item-title>
                                <!--<v-list-item-subtitle>
                                    {{ child.text }}
                                </v-list-item-subtitle>-->
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                </v-list>
                <v-divider></v-divider>
                <template v-for="item in items">
                    <v-row v-if="item.heading" :key="item.heading" align="center">
                        <v-col cols="6">
                            <v-subheader v-if="item.heading">
                                {{ item.heading }}
                            </v-subheader>
                        </v-col>
                        <v-col cols="6" class="text-center">
                            <a href="#!" class="body-2 black--text">EDIT</a>
                        </v-col>
                    </v-row>
                    <v-list-group
                        v-else-if="item.children"
                        :key="item.text"
                        :group="item.group"
                        v-model="item.model"
                        :prepend-icon="item.icon"
                        append-icon="mdi-chevron-down"
                        exact-active-class="test"
                    >
                        <template v-slot:activator>
                            <v-list-item style="padding: 8px 0!important;">
                                <v-list-item-content>
                                    <v-list-item-title class="text-left">
                                        {{ item.text + ' --- 1' }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        <v-list-item
                            v-for="(child, i) in item.children"
                            :key="i"
                            @click="isUpdateDropDown(child.url)"
                            :to="$i18n.path(child.url)"
                            :exact="true"
                            :nuxt="true"
                            link
                        >
                            <v-list-item-action v-if="child.icon">
                                <v-icon>{{ child.icon }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ child.text + '-1' }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                    <v-list-item
                        v-else
                        :key="item.text"
                        @click="isUpdateDropDown(item.url)"
                        :to="$i18n.path(item.url)"
                        :exact="true"
                        :nuxt="true"
                        link
                    >
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.text + ' | 123' }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar id="header" app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <!--            <v-toolbar-title>控制面板</v-toolbar-title>-->
            <v-toolbar-title>{{ breadcrumbsText }}</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" text>
                        <v-img :src="flagUrl" aspect-ratio="1.7" max-width="64" max-height="32" contain></v-img>
                    </v-btn>
                </template>
                <v-list>
                    <template v-for="item in locals">
                        <v-list-item @click="switchLanguage(item.lang)">
                            <v-avatar tile size="24" class="v-avatar-mr">
                                <v-img :src="item.flagUrl" aspect-ratio="1" contain></v-img>
                            </v-avatar>
                            <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
                        </v-list-item>
                    </template>
                </v-list>
            </v-menu>
        </v-app-bar>
    </div>
</template>

<script>
import FocreUtil from '@/assets/utils/focre-util'
import drawerJs from '~/assets/js/common/drawer'

export default {
    name: 'Drawer',
    data() {
        return {
            drawer: null,
            locals: [
                {
                    lang: 'zh-CN',
                    title: 'label.common.simplifiedChinese',
                    flagUrl: '/images/flags/cn.png'
                },
                {
                    lang: 'en-US',
                    title: 'label.common.english',
                    flagUrl: '/images/flags/us.png'
                }
            ],
            flagUrl: '',
            items: [
                { icon: 'mdi-view-dashboard', text: '首页', url: '/' },
                { icon: 'mdi-cog-outline', text: '博客配置', url: '/system' },
                {
                    icon: 'mdi-shape',
                    text: '文章分类首页',
                    model: false,
                    children: [{ icon: 'mdi-plus', text: 'Create label', url: '/cate' }]
                },
                {
                    icon: 'mdi-shield-half-full',
                    text: '权限管理',
                    model: false,
                    children: [
                        { icon: 'mdi-account', text: '用户管理', url: '/security/admin' },
                        { icon: 'mdi-account-supervisor-circle', text: '角色管理', url: '/security/role' },
                        { icon: 'mdi-account-details', text: '部门管理', url: '/security/dept' },
                        { icon: 'mdi-approximately-equal-box', text: '菜单管理', url: '/security/menu' }
                    ]
                }
            ],
            userInfo: {
                icon: 'mdi-chevron-up',
                'icon-alt': 'mdi-menu-down',
                text: 'ye21st',
                model: false,
                children: [
                    { text: '我的简介', icon: 'MP' },
                    { text: '编辑简介', icon: 'E' }
                ]
            },
            breadcrumbsText: ''
        }
    },
    computed: {},
    mounted() {
        const self = this
        self.flagUrl = FocreUtil.chooseFlag(self.$store.state.locale)

        drawerJs.$on('breadcrumbsEvent', function(msg) {
            self.breadcrumbsText = msg
        })

        self.reorganizationArray(self.items)
    },
    methods: {
        switchLanguage(lang) {
            const self = this
            const locale = self.$store.state.locale
            if (locale === lang) {
                return
            }
            switch (lang) {
                case 'zh-CN':
                    // eslint-disable-next-line no-useless-escape
                    self.$router.push(self.$route.fullPath.replace(/^\/[^\/]+/, ''))
                    break
                case 'en-US':
                    self.$router.push('/' + lang + self.$route.fullPath)
                    break
                default:
                    // eslint-disable-next-line no-useless-escape
                    self.$router.push(self.$route.fullPath.replace(/^\/[^\/]+/, ''))
                    break
            }
            self.flagUrl = FocreUtil.chooseFlag(lang)
            self.$vuetify.lang.current = FocreUtil.chooseVuetifyLang(lang)
        },
        isUpdateDropDown(url) {
            const self = this
            for (let i = 0, len = self.items.length; i < len; i++) {
                const obj = self.items[i]
                if (obj.children) {
                    obj.model = false
                }
            }
            for (let i = 0, len = self.items.length; i < len; i++) {
                const obj = self.items[i]
                if (obj.children) {
                    for (let j = 0, len = obj.children.length; j < len; j++) {
                        if (obj.children[j].url === url) {
                            obj.model = true
                            self.$router.push(self.$i18n.path(url))
                        }
                    }
                }
            }
        },
        reorganizationArray(objArray) {
            const self = this
            for (let i = 0, len = objArray.length; i < len; i++) {
                const obj = objArray[i]
                if (obj.children) {
                    for (let j = 0, len = obj.children.length; j < len; j++) {
                        if (self.$i18n.path(obj.children[j].url) === self.$route.path) {
                            obj.model = true
                        }
                    }
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/common/drawer.scss';
.test {
    background-color: #f00;
}
</style>
