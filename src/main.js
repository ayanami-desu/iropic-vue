import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import Env from './components/env'
import axios from "axios";
import VueAxios from 'vue-axios'


Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.prototype.MyEnv = Env

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
