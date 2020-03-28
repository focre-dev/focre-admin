import zhHans from 'vuetify/es5/locale/zh-Hans'
import en from 'vuetify/es5/locale/en'
import FocreUtil from '@/assets/utils/focre-util'

/* export default {
    breakpoint: {},
    icons: {},
    lang: {
        locales: { zhHans, en },
        current: FocreUtil.chooseVuetifyLang()
    },
    theme: {}
} */

export default function({ app, store }) {
    return {
        breakpoint: {},
        icons: {},
        lang: {
            locales: { zhHans, en },
            current: FocreUtil.getVuetifyLang(store.state.locale)
        },
        theme: {}
    }
}
