export default {
    server: {
        port: 8000, // default: 3000
        host: 'localhost' // default: localhost
    },

    env: {},
    head: {
        title: 'raspezdals-nuxt',
        meta: [
            //
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Raspezdals team' }
        ],
        link: [
            //
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    loading: { color: '#3B8070' },
    css: ['~/assets/css/main.css'],
    build: {},
    modules: [
        //
        '@nuxtjs/axios',
        '@nuxtjs/vuetify'
    ],
    axios: {}
};
