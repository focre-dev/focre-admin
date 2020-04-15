<template>
    <div class="panel-wrapper">
        <span class="logo">
            <img src="~/assets/images/logo.png" alt="" />
        </span>

        <div class="slogan-wrapper">
            <div class="slogan">
                <img src="~/assets/images/login-bg.svg" alt="" />
            </div>
        </div>

        <div class="panel-content">
            <v-app class="login-con">
                <v-content>
                    <v-container fluid fill-height>
                        <v-row align-center justify-center>
                            <v-col class="frame">
                                <h1 v-if="!isMobile">
                                    {{ $t('label.login.title') }}
                                </h1>
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-text-field
                                        v-model="username"
                                        :label="$t('label.common.username')"
                                        :rules="usernameRules"
                                        @keyup.enter.native="login"
                                        prepend-icon="mdi-account"
                                        clearable
                                        required
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="password"
                                        :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="showPwd ? 'text' : 'password'"
                                        :rules="passwordRules"
                                        @click:append="showPwd = !showPwd"
                                        :label="$t('label.common.password')"
                                        @keyup.enter.native="login"
                                        prepend-icon="mdi-lock"
                                        required
                                    ></v-text-field>
                                    <v-row column wrap justify-end align-end>
                                        <v-col>
                                            <v-btn :loading="loginLoading" @click="login">
                                                <span slot="loader">Loading...</span>
                                                {{ $t('label.login.title') }}
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-content>

                <!--<v-footer color="#fbfbfb" height="auto">
                    <v-row>
                        <v-col text-xs-center>
                            {{ currentYear }}
                        </v-col>
                    </v-row>
                </v-footer>-->
            </v-app>
        </div>
    </div>
</template>

<script>
import FocreUtil from '@/assets/utils/focre-util'
import Auth from '@/assets/utils/auth'

export default {
    name: 'Login',
    components: {},
    data() {
        return {
            currentYear: new Date().getFullYear(),
            valid: true,
            showPwd: false,
            username: 'admin',
            password: '111111',
            usernameRules: [
                (v) => !!v || this.$t('validate.notEmpty.system.blogTitle'),
                (v) => (v && v.length <= 10) || 'Name must be less than 10 characters'
            ],
            passwordRules: [
                (v) => !!v || this.$t('validate.notEmpty.system.blogTitle'),
                (v) => (v && v.length <= 10) || 'Name must be less than 10 characters'
            ],
            loginLoading: false
        }
    },
    computed: {
        isMobile() {
            return FocreUtil.isMobile()
        }
    },
    created() {},
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
                // self.$router.push(self.$i18n.path('/'))
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

<style lang="scss">
@import '~assets/styles/login/login.scss';
</style>
