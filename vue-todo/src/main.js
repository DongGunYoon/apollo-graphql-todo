import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/router';

// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// app.use(store)
// app.use(BootstrapVue)
// app.use(IconsPlugin)

const app = createApp(App)
app.use(router)

app.mount('#app')
