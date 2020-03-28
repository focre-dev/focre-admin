<template>
    <v-app-bar app>
        <!--        <v-app-bar-nav-icon v-if="type !== 'permanent'" @click.stop="model = !model" />-->
        <v-app-bar-nav-icon @click.stop="drawer" />
        <!--        <v-toolbar-title>Focre</v-toolbar-title>-->
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
</template>

<script>
import FocreUtil from '@/assets/utils/focre-util'

export default {
    name: 'Navbar',
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
            flagUrl: ''
        }
    },
    computed: {},
    mounted() {
        const self = this
        // const locale = self.$store.state.locale
        self.flagUrl = FocreUtil.chooseFlag(self.$store.state.locale)
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
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/common/navbar.scss';
</style>
