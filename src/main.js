import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import Env from './components/env'
import axios from "axios";
import VueAxios from 'vue-axios'
import store from './stores'


Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.prototype.MyEnv = Env

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
