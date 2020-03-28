<template>
    <v-app>
        <Drawer></Drawer>
        <v-content>
            <div id="content" class="pa-2">
                <nuxt />
            </div>
            <Footer />
        </v-content>
    </v-app>
</template>

<script>
import Drawer from '@/components/common/drawer'
import Footer from '@/components/common/Footer'
import FocreUtil from '@/assets/utils/focre-util'

export default {
    name: 'Frame',
    components: { Footer, Drawer },
    head() {
        return {
            bodyAttrs: {
                class: this.themeName
            }
        }
    },
    data() {
        return {
            themeName: ''
        }
    },
    created() {
        // this.$vuetify.theme.dark = true
    },
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
        // this.$store.commit('SET_LANG', localStore)
    },
    methods: {}
}
</script>
<style>
#content {
    height: 100%;
    padding-bottom: 100px;
}
</style>
