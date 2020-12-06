import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/plugin/axios'
import VueClipboard from 'vue-clipboard2'
import * as filters from '@/filter';
import i18n from './i18n'

//引入bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

Vue.use(router)
Vue.use(VueClipboard)


new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
