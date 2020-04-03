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
                <!-- <v-spacer></v-spacer> -->
                <v-content>
                    <v-container fluid fill-height>
                        <v-row align-center justify-center>
                            <v-col class="frame">
                                <h1 v-if="!isMobile">
                                    {{ $t('label.login.title') }}
                                </h1>
                                <v-form>
                                    <v-text-field
                                        v-model="form.username"
                                        :label="$t('label.common.username')"
                                        @keyup.enter.native="login"
                                        prepend-icon="mdi-account"
                                        clearable
                                        required
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="form.password"
                                        :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="showPwd ? 'text' : 'password'"
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

                <v-footer color="#fbfbfb" height="auto">
                    <v-row>
                        <v-col text-xs-center>
                            <!-- {{ $t('common.copyrightMessage', { currentYear }) }} -->
                        </v-col>
                    </v-row>
                </v-footer>
            </v-app>
        </div>
    </div>
</template>

<script>
import FocreUtil from '@/assets/utils/focre-util'

export default {
    name: 'Login',
    components: {},
    data() {
        return {
            currentYear: new Date().getFullYear(),
            showPwd: false,
            form: {
                username: 'admin',
                password: 'admin123'
            },
            loginLoading: false
        }
    },
    computed: {
        isMobile() {
            return FocreUtil.isMobile()
        }
    },
    methods: {
        login() {
            const self = this
            self.$router.push(self.$i18n.path('/'))
        },
        redirectForgotPassword() {
            this.$message({
                type: 'info',
                text: 'Ahem: Please add redirect function'
            })
        }
    },
    created() {}
}
</script>

<style lang="scss">
@import '~assets/styles/login/login.scss';
</style>
