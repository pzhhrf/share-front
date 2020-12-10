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
//引入自己的css
import './assets/css/style.css';
import './assets/css/default.css';
import '@mdi/font';
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//引入bootstrap vue的验证组件
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/en.json';
Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  });
})

Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

Vue.use(router)
Vue.use(VueClipboard)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
