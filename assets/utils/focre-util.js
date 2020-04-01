import CryptoJS from 'crypto-js'

export default class FocreUtil {
    /**
     * 存储localStorage
     */
    static setStore(name, content) {
        if (process.client) {
            if (!name) return
            if (typeof content !== 'string') {
                content = JSON.stringify(content)
            }
            window.localStorage.setItem(name, content)
        }
    }

    /**
     * 获取localStorage
     */
    static getStore(name) {
        if (process.client) {
            if (!name) return
            return window.localStorage.getItem(name)
        }
    }

    /**
     * 删除localStorage
     */
    static removeStore(name) {
        if (process.client) {
            if (!name) return
            window.localStorage.removeItem(name)
        }
    }

    /**
     * MD5 Encrypt
     * @param source
     * @returns {*}
     */
    static md5(source) {
        return CryptoJS.MD5(source).toString()
    }

    static md5ForCount(count, source) {
        for (let i = 1; i <= count; i++) {
            source = this.md5(source)
        }
        return source
    }

    /**
     * 判断当前浏览器主流语言
     */
    static getBrowserLanguage() {
        return navigator.language || navigator.userLanguage
    }

    static chooseVuetifyLang(language) {
        let lang = ''
        switch (language) {
            case 'zh-CN':
                lang = 'zhHans'
                break
            case 'en-US':
                lang = 'en'
                break
            default:
                lang = 'zhHans'
                break
        }
        return lang
    }

    static getVuetifyLang(language) {
        let lang = ''
        switch (language) {
            case 'zh-CN':
                lang = 'zhHans'
                break
            case 'en-US':
                lang = 'en'
                break
            default:
                lang = 'zhHans'
                break
        }
        return lang
    }

    /**
     * 返回国旗字符串
     * @param language
     * @returns {string}
     */
    static chooseFlag(language) {
        let lang = language.substring(language.indexOf('-') + 1, language.length)
        lang = lang.toLowerCase()
        lang = '/images/flags/' + lang + '.png'
        return lang
    }

    /**
     * 判断是不是手机端
     * @returns {boolean}
     */
    static isMobile() {
        if (process.client) {
            return !!navigator.userAgent.match(/mobile/i)
        }
    }
}

/**
 * 判断是不是手机端
 * @returns {boolean}
 */
export function isMobile() {
    return !!navigator.userAgent.match(/mobile/i)
}
