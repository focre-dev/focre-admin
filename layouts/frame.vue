<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
            <v-list>
                <template v-for="item in navList">
                    <template v-if="item.children">
                        <!--                        <v-list-group :prepend-icon="item.icon" :value="isUpdateDropDown(item.url, item.children)">-->
                        <v-list-group :prepend-icon="item.icon" :value="item.model">
                            <template v-slot:activator>
                                <v-list-item-title>{{ $t(item.text) }}</v-list-item-title>
                            </template>
                            <template v-for="child in item.children">
                                <v-list-item :to="$i18n.path(child.url)" :exact="true" :nuxt="true" link>
                                    <v-list-item-icon></v-list-item-icon>
                                    <v-list-item-title>{{ $t(child.text) }}</v-list-item-title>
                                </v-list-item>
                            </template>
                        </v-list-group>
                    </template>
                    <template v-else>
                        <v-list-item :to="$i18n.path(item.url)" :exact="true" :nuxt="true" link>
                            <v-list-item-icon>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>

                            <v-list-item-title>{{ $t(item.text) }}</v-list-item-title>
                        </v-list-item>
                    </template>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
                <span class="hidden-sm-and-down">Focre</span>
            </v-toolbar-title>
            <v-spacer />
            <v-menu v-model="menuDown" offset-y bottom left transition="slide-y-transition">
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" tile color="transparent" elevation="0  ">
                        <v-icon>mdi-translate</v-icon>
                        <span class="pl-1 pr-1 text-none subtitle-1">{{ lang }}</span>
                        <v-icon>{{ 'mdi-' + menuDownIcon }}</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item v-for="(item, i) in languages" :key="i">
                        <v-list-item-title @click="switchLanguage(item.lang, item.text)" class="frame-lang">{{
                            item.text
                        }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
        <div id="main-container" class="main-container">
            <v-content>
                <v-container fluid>
                    <v-slide-y-transition mode="out-in">
                        <nuxt />
                    </v-slide-y-transition>
                </v-container>
            </v-content>
        </div>
    </v-app>
</template>

<script>
import FocreUtil from '@/assets/utils/focre-util'

export default {
    name: 'Frame',
    components: {},
    head() {
        return {
            bodyAttrs: {}
        }
    },
    props: {},
    data() {
        return {
            drawer: null,
            navList: [
                { icon: 'mdi-home', text: 'label.title.home', url: this.$i18n.path('/') },
                {
                    icon: 'mdi-square-edit-outline',
                    text: 'label.title.article',
                    model: true,
                    children: [
                        {
                            icon: 'mdi-plus',
                            text: 'label.articles.all',
                            url: this.$i18n.path('/articles/list')
                        },
                        {
                            icon: 'mdi-plus',
                            text: 'label.articles.write',
                            url: this.$i18n.path('/articles/write')
                        }
                    ]
                },
                {
                    icon: 'mdi-cog-outline',
                    text: 'label.title.systemSetting',
                    url: '/system',
                    model: false,
                    children: [
                        {
                            icon: 'mdi-plus',
                            text: 'label.system.basicConfig',
                            url: this.$i18n.path('/system/basic')
                        },
                        {
                            icon: 'mdi-plus',
                            text: 'label.system.seoConfig',
                            url: this.$i18n.path('/system/seo')
                        },
                        {
                            icon: 'mdi-plus',
                            text: 'label.system.annexConfig',
                            url: this.$i18n.path('/system/annex')
                        },
                        {
                            icon: 'mdi-plus',
                            text: 'label.system.smtpConfig',
                            url: this.$i18n.path('/system/smtp')
                        }
                    ]
                }
            ],
            menuDown: false,
            menuDownIcon: 'chevron-down',
            lang: '',
            languages: [
                { text: '简体中文', lang: 'zh-CN' },
                { text: 'English', lang: 'en-US' }
            ]
        }
    },
    watch: {
        menuDown(newVal, oldVal) {
            const self = this
            if (newVal === true) {
                self.menuDownIcon = 'chevron-up'
            } else {
                self.menuDownIcon = 'chevron-down'
            }
        }
    },
    created() {},
    mounted() {
        const self = this
        let localStore = FocreUtil.getStore('lang')
        if (localStore === '' || localStore === null) {
            // eslint-disable-next-line no-unused-vars
            const lang = FocreUtil.getBrowserLanguage()
            switch (lang) {
                case 'zh-CN':
                    FocreUtil.setStore('lang', lang)
                    break
                case 'en-US':
                    FocreUtil.setStore('lang', lang)
                    break
                default:
                    FocreUtil.setStore('lang', 'zh-CN')
                    break
            }
        }
        localStore = FocreUtil.getStore('lang')
        for (const value of self.languages) {
            if (localStore === value.lang) {
                self.lang = value.text
            }
        }
        self.isUpdateDropDown()
    },
    methods: {
        isUpdateDropDown() {
            const self = this
            const nowUrl = self.$route.path
            self.navList.forEach((item) => {
                if (item.children) {
                    if (nowUrl.includes(item.url)) {
                        item.model = true
                    }
                }
            })
        },
        switchLanguage(lang, langText) {
            const self = this
            const locale = self.$store.state.locale
            if (locale === lang) {
                return
            }
            self.lang = langText
            if (self.$i18n.fallbackLocale === lang) {
                // eslint-disable-next-line no-useless-escape
                self.$router.push(self.$route.fullPath.replace(/^\/[^\/]+/, ''))
            } else {
                self.$router.push('/' + lang + self.$route.fullPath)
            }
            self.$vuetify.lang.current = FocreUtil.chooseVuetifyLang(lang)
        }
    }
}
</script>
<style lang="scss">
.main-container {
    min-height: 100%;
    width: 100%;
    position: relative;
    overflow-y: auto;
}
.frame-lang {
    cursor: pointer;
}
</style>
