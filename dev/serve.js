import { createApp } from 'vue';
import Dev from './serve.vue';
window.axios = require('axios');
// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and it's corresponding "app.use" call
import TmcTypo from '@/entry.esm';

const app = createApp(Dev);
app.use(TmcTypo, {
    //labelType: 'standard'
});

app.mount('#app');
