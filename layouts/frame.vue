<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
            <v-list>
                <template v-for="item in items">
                    <template v-if="item.children">
                        <template v-for="child in item.children">
                            <v-list-group :prepend-icon="item.icon">
                                <template v-slot:activator>
                                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                                </template>
                                <v-list-item :to="$i18n.path(child.url)">
                                    <v-list-item-icon></v-list-item-icon>
                                    <v-list-item-title>{{ child.text }}</v-list-item-title>
                                </v-list-item>
                            </v-list-group>
                        </template>
                    </template>
                    <template v-else>
                        <v-list-item :to="$i18n.path(item.url)">
                            <v-list-item-icon>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>

                            <v-list-item-title>{{ item.text }}</v-list-item-title>
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
            <v-btn icon>
                <v-icon>mdi-apps</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-bell</v-icon>
            </v-btn>
            <v-btn icon large>
                <v-avatar size="32px" item>
                    <v-img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify"
                /></v-avatar>
            </v-btn>
        </v-app-bar>
        <div id="main-container" class="main-container">
            <v-content>
                <v-container fluid>
                    <v-slide-y-transition mode="out-in">
                        <nuxt />
                    </v-slide-y-transition>
                </v-container>
            </v-content>
            <app-main />
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
            items: [
                { icon: 'mdi-home', text: '首页', url: '/' },
                {
                    icon: 'mdi-cog-outline',
                    text: '系统设置',
                    model: false,
                    children: [{ icon: 'mdi-plus', text: '基本设置', url: this.$i18n.path('/system/basic') }]
                },
                {
                    icon: 'mdi-lock',
                    text: '测试',
                    model: false,
                    children: [{ icon: 'mdi-plus', text: 'Create label', url: '/test' }]
                }
            ]
        }
    },
    created() {},
    mounted() {
        // const self = this
        // 建议主题由后台设置
        // self.themeName = 'lightTheme'

        const localStore = FocreUtil.getStore('lang')
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
    },
    methods: {}
}
</script>
<style lang="scss">
.main-container {
    min-height: 100%;
    width: 100%;
    position: relative;
    overflow-y: auto;
}
</style>
