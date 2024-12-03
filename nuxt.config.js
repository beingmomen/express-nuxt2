export default {
  // Global page headers
  head: {
    title: 'nuxt2-express',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS
  css: [
    '@/assets/css/main.css'
  ],

  // Plugins to run before rendering page
  plugins: [],

  // Auto import components
  components: true,

  // Modules for dev and build
  buildModules: [
    '@nuxtjs/tailwindcss'
  ],

  // Modules
  modules: [
    '@nuxtjs/axios'
  ],

  // Axios module configuration
  axios: {
    baseURL: '/api'
  },

  // Server middleware
  serverMiddleware: [
    '~/server/index.js'
  ],

  // Build Configuration
  build: {}
}
