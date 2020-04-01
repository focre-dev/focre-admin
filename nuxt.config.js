export default {
    mode: 'universal',
    server: {
        host: '0.0.0.0' // default: localhost
    },
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        script: [{}]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#000' },
    // loading: false,
    /*
     ** Global CSS
     */
    css: ['~assets/styles/app.scss', 'normalize.css/normalize.css'],
    router: {
        middleware: 'i18n'
    },
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '@/plugins/i18n',
        '@/plugins/animejs',
        '@/plugins/axios',
        '@/plugins/api',
        { src: '@/plugins/apexcharts', ssr: false },
        { src: '@/plugins/element-ui', ssr: true }
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Simple usage
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module',
        '@nuxtjs/vuetify'
    ],
    vuetify: {
        /* module options */
        optionsPath: '@/plugins/vuetify.options.js'
    },
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/style-resources'
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},
    styleResources: {},
    /*
     ** Build configuration
     */
    build: {
        vendor: ['vue-apexcharts', 'element-ui'],
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {},
        babel: {
            plugins: [
                [
                    'component',
                    {
                        libraryName: 'element-ui',
                        styleLibraryName: 'theme-chalk'
                    }
                ]
            ],
            comments: true
        }
    }
}
