import { createVuetify } from 'vuetify';
import { mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';

import 'vuetify/styles'
// https://nuxt.com/docs/migration/plugins-and-middleware#plugins-and-middleware
export default defineNuxtPlugin((nuxtApp) => {
    const i18n = { global: nuxtApp.$i18n };

    const vuetify = createVuetify({
        icons: {
            defaultSet: 'mdi',
            sets: {
                mdi
            }
        },
    });

    nuxtApp.vueApp.use(vuetify);
});