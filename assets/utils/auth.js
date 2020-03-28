import FocreUtil from '@/assets/utils/focre-util'

export default class Auth {
    static setToken(token, randomKey) {
        FocreUtil.setStore('token', token)
        FocreUtil.setStore('randomKey', randomKey)
    }

    static getToken() {
        return FocreUtil.getStore('token')
    }
}
