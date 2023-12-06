// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      script: [{ src: "https://www.youtube.com/iframe_api" }],
    },
  },
  runtimeConfig: {
    // Public keys that are exposed to the client
    public: {
      youtubeapi: process.env.NUXT_PUBLIC_YOUTUBE_API,
      youtubeapi2: process.env.NUXT_PUBLIC_YOUTUBE_API_OTHER,
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    'mixpanel-nuxt',
    // '@zadigetvoltaire/nuxt-gtm',
    // "nuxt-gtag",
    'nuxt-headlessui',
  ],
  // gtag: {
  //   id: "G-705K72Y5Y0",
  // },
  mixpanel: {
    token: 'a34cbc23a6bd2fba4ee0c331643f6717',
    disabled: false,
    config: {
      track_pageview: true
    }
  },
  headlessui: {
    prefix: ''
  }
});
