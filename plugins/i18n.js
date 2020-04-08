import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
    const data = {}
    const Locale = store.state.locales
    for (let i = 0; i < Locale.length; i++) {
        data[Locale[i]] = require(`~/locales/${Locale[i]}.json`)
    }
    app.i18n = new VueI18n({
        locale: store.state.locale,
        fallbackLocale: 'zh-CN',
        messages: data
    })

    app.i18n.path = (link) => {
        if (app.i18n.locale === app.i18n.fallbackLocale) {
            let url = `${link}`
            for (const value of Locale) {
                const lang = '/' + value
                url = url.replace(lang, '')
            }
            return url
        } else {
            let url = `/${app.i18n.locale}${link}`
            const len = url.split(`/${app.i18n.locale}`).length - 1
            if (len > 1) {
                url = url.replace(`/${app.i18n.locale}`, '')
            }
            if (len > 1) {
                return `${link}`
            } else {
                return url
            }
        }
    }
}
