<template>
    <v-app id="inspire">
        <nuxt />
    </v-app>
</template>

<script>
import FocreUtil from '@/assets/utils/focre-util'

export default {
    name: 'Default',
    head() {
        return {
            bodyAttrs: {
                class: this.themeName
            }
        }
    },
    data() {
        return {
            themeName: '',
            loginForm: {
                username: '',
                password: ''
            }
        }
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
        this.$store.commit('SET_LANG', localStore)
    },
    methods: {}
}
</script>

<style></style>
