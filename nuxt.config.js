export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  target: 'server',
  ssr: false,
  generate: {
    fallback: false
  },
  head: {
    title: 'İlliyyûn TV',
    meta: [
      { charset: 'utf-8' },
      { name: 'yandex-verification', content: 'b4acfbbbcd353fd6' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "İlliyyûn TV Allah'ın (subhanehu ve teala) kelamı, hücceti, ve hidâyeti olan Kur'an-ı Kerîm'e hizmet etmek için kurulmuş bağımsız bir organizasyondur." }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lato&family=Montserrat:wght@200;400&family=Open+Sans&family=Source+Sans+Pro&display=swap' }

    ],
    script: [
      { src: 'https://player.vimeo.com/api/player.js', body: true }
    ]

  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "~/assets/css/style.css",
    "~/assets/css/responsive.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: "~/plugins/markdown.js",
      ssr: false
    },
    '~/plugins/functions.js',
    { src: '~/plugins/infiniteloading', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components', // shortcut to { path: '~/components' }
    { path: '~/components/video/' },
    { path: '~/components/photos/' }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: {
        implementation: require('sass'),
      },
    },
    babel: {
      compact: true
    }
  },

  loaders: [
    { test: /\.js$/, loader: 'babel', query: { compact: false } }
  ],

  axios: {
    baseURL: process.env.BASE_URL || 'https://illiyyuntv-api.herokuapp.com/'
  }
}
