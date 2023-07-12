// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        'vue-dadata/dist/style.css',
        'vuetify/lib/styles/main.sass',
        '@fortawesome/fontawesome-svg-core/styles.css',
        'vue-tel-input/dist/vue-tel-input.css',
        '@vueform/slider/themes/default.css',
        '~/assets/css/style.css',
    ],
    build: {
        transpile: [
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-brands-svg-icons',
            '@fortawesome/free-regular-svg-icons',
            '@fortawesome/free-solid-svg-icons',
            '@fortawesome/vue-fontawesome',
            'vuetify',
        ]
    },
    vue: {
        compilerOptions: {
            isCustomElement: (tag) => ['modal-dialog'].includes(tag),
        }
    },
    // ssr: true,
    modules: [
        'nuxt-swiper',
        'nuxt-lazy-hydrate',
        '@pinia/nuxt',
        '@nuxt/image-edge',
        // '@nuxtjs/recaptcha',
        'nuxt-meilisearch',
    ],
    meilisearch: {
        hostUrl: process.env.NUXT_PUBLIC_SEARCH_HOST || 'http://127.0.0.1:7700/',
        // hostUrl: process.env.SEARCH_HOST || 'http://172.17.0.1:7700/',
        searchApiKey: process.env.NUXT_PUBLIC_SEARCH_API_KEY || '',
        adminApiKey: process.env.NUXT_PUBLIC_ADMIN_API_KEY || '',
        serverSideUsage: true,
        // instantSearch: true,
        instantSearch: {
            theme: 'satellite'
        },
        clientOptions: {
            placeholderSearch: true,
            paginationTotalHits: 50,
            finitePagination: true,
            primaryKey: undefined,
            keepZeroFacets: false
        }
    },
    plugins: [
        '~/plugins/font-awesome.ts',
        '~/plugins/nuxt-lazy-hydrate.ts',
        '~/plugins/breadcrumbs.js',
        '~/plugins/vuetify.ts',
        '~/plugins/focus-trap.ts',
        '~/plugins/vue-dadata.js',
        {src: '~/plugins/vue-tel-input.js', mode: 'client'},
        {src: '~/plugins/vue-star-rating.ts', mode: 'client'},
    ],
    runtimeConfig: {
      public: {
          apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE || '',
          baseUrl: process.env.NUXT_PUBLIC_BASE || '',
          dadataToken: process.env.NUXT_PUBLIC_DADATA_TOKEN || '',
          boxberryToken: process.env.NUXT_PUBLIC_BOXBERRY_TOKEN || '',
      },
    },
})
