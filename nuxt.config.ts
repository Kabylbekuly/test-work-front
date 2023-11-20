// https://nuxt.com/docs/api/configuration/nuxt-config
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5'

export default defineNuxtConfig({
    ssr: false,
    modules: [
        "@pinia/nuxt",
        "@nuxtjs/tailwindcss",
        "@ant-design-vue/nuxt",
        "nuxt-swiper"
    ],
    swiper: {
        modules: ["navigation", "pagination", "thumbs", "free-mode", "autoplay"],
    },
    antd: {
        // Options
    },
    components: {
        global: true,
        dirs: ["@/components"],
    },
    vite: {
        server: {
            fs: {
                strict: false,
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/scss/index.scss";',
                },
            },
        },
        plugins: [ckeditor5({ theme: require.resolve( '@ckeditor/ckeditor5-theme-lark' ) })]
    },
    css: [
        "@/assets/scss/normalize.scss",
        "~/assets/lib/fontawesome-free/css/all.min.css",
    ],
    runtimeConfig: {
        public: {
            baseURL: "http://test.lc/api/",
        },
    },
});
