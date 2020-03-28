import Locale from '~/locales'

export const state = () => ({
    locales: Locale(),
    locale: Locale()[0]
})

export const mutations = {
    SET_LANG(state, locale) {
        if (state.locales.includes(locale)) {
            state.locale = locale
        }
    }
}
