import { baseUrl } from '~/config/env.js'

export default function({ $axios, redirect, app }) {
    $axios.setBaseURL(baseUrl)
    $axios.setHeader('Access-Control-Allow-Origin', '*')
    $axios.setHeader('Content-Type', 'application/json;charset=UTF-8')
    $axios.setHeader('Accept-Language', app.i18n.locale)
    $axios.setHeader('Client-Type', 1)
    if (process.client) {
        // eslint-disable-next-line no-constant-condition
        if (!'token') return
        let token = window.localStorage.getItem(name)
        if (token == null) {
            token = ''
        }
        $axios.setHeader('Authorization', 'Bearer ' + token)
    }

    // request interceptor
    $axios.interceptors.request.use(
        (config) => {
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )
    $axios.onRequest((config) => {})

    // 返回结果回调
    $axios.onResponse((res) => {
        return res
    })

    // response interceptor
    $axios.interceptors.response.use(
        (response) => {
            const res = response.data
            if (res.code === 205) {
                app.i18n.path = () => {
                    if (app.i18n.locale === app.i18n.fallbackLocale) {
                        redirect(`/login`)
                    }
                    redirect(`/${app.i18n.locale}/login`)
                }
            }
            return response
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    $axios.onError((error) => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/404')
        } else if (code === 500) {
            redirect('/500')
        }
    })
}
