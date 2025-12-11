// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      Roboto: [300, 400, 500, 700, 900], // Pesos que necesites
    },
    display: 'swap', // Mejora el rendimiento
    download: true, // Descarga las fuentes localmente
    inject: true, // Inyecta automáticamente
  },

  css: [
    '~/assets/global.css', // Tu archivo CSS global
  ],
})