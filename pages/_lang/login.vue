<template>
    <v-container id="login" fluid fill-height>
        <v-row align="center" justify="center" class="lighten-5">
            <v-col cols="12" lg="3" md="4" sm="6" no-gutters>
                <v-card dark flat color="transparent">
                    <v-card-title>
                        <v-row align="center" justify="center" class="lighten-5">
                            <v-avatar size="64">
                                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                            </v-avatar>
                        </v-row>
                    </v-card-title>
                    <v-card-subtitle class="text-center">{{ $t('label.login.welcome') }}</v-card-subtitle>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field
                                v-model="username"
                                :disabled="isUpdating"
                                :rules="usernameRules"
                                dark
                                flat
                                filled
                                rounded
                                color="blue-grey lighten-2"
                                :label="$t('label.common.username')"
                            ></v-text-field>
                            <v-text-field
                                v-model="password"
                                :disabled="isUpdating"
                                :rules="passwordRules"
                                @keyup.enter.native="login"
                                dark
                                flat
                                filled
                                rounded
                                type="password"
                                color="blue-grey lighten-2"
                                :label="$t('label.common.password')"
                            ></v-text-field>
                            <div class="text-center">
                                <v-btn
                                    @click="login()"
                                    :disabled="loginBtnDisable"
                                    class="text-center"
                                    dark
                                    text
                                    rounded
                                    outlined
                                    large
                                    >{{ $t('label.login.title') }}</v-btn
                                >
                            </div>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <error-message :isShow="isShow" :text="errorText"></error-message>
    </v-container>
</template>

<script>
import Auth from '@/assets/utils/auth'
import FocreUtil from '@/assets/utils/focre-util'
import ErrorMessage from '@/components/message/error'

export default {
    name: 'Login',
    components: { ErrorMessage },
    data() {
        return {
            // username: 'admin',
            // password: 'focre',
            username: 'admin',
            password: '111111',
            loginBtnDisable: false,

            alignment: 'center',
            dense: false,
            justify: 'center',

            isUpdating: false,

            valid: true,
            usernameRules: [
                (v) => !!v || this.$t('validate.notEmpty.common.username'),
                (v) => (v && v.length <= 20) || this.$t('validate.stringLength.common.username', { num: 20 })
            ],
            passwordRules: [
                (v) => !!v || this.$t('validate.notEmpty.common.password'),
                (v) => (v && v.length <= 100) || this.$t('validate.stringLength.common.password', { num: 100 })
            ],
            isShow: false,
            errorText: ''
        }
    },
    mounted() {},
    methods: {
        async login() {
            const self = this
            self.loginBtnDisable = true
            if (!self.validate()) {
                self.loginBtnDisable = false
                return false
            }
            const params = {
                username: self.username,
                password: FocreUtil.md5ForCount(2, self.password)
            }
            const result = await this.$Auth.login(params)
            const data = result.data
            if (result.code === 200) {
                Auth.setToken(data.token, data.randomKey)
                self.$router.push(self.$i18n.path('/'))
            } else {
                self.errorText = result.msg
                self.isShow = true
                self.loginBtnDisable = false
            }
        },
        validate() {
            return !!this.$refs.form.validate()
        }
    }
}
</script>
<style lang="scss"></style>
<style lang="scss">
@import '~assets/css/login/login.scss';
</style>
