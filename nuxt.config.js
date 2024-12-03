export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
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
  css: [],

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
    baseURL: '/.netlify/functions/api'
  },

  // Build Configuration
  build: {
    transpile: [
      'defu'
    ]
  },

  // Server middleware for development only
  serverMiddleware: process.env.NODE_ENV === 'production' ? [] : [
    { path: '/api', handler: '~/server/index.js' }
  ],
  // Public runtime config
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.NODE_ENV === 'production'
        ? '/.netlify/functions/api'
        : 'http://localhost:3000/api'
    }
  }
}
