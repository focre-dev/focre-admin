/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */
// eslint-disable-next-line import/no-mutable-exports
let baseUrl
// eslint-disable-next-line import/no-mutable-exports
let routerMode

if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:8081'
    routerMode = 'hash'
} else {
    baseUrl = 'https://api.github.com/'
    routerMode = 'hash'
}

export { baseUrl, routerMode }
