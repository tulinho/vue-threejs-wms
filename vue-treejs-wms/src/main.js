import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './registerServiceWorker'
import store from './store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

const axios = require('axios').default;

Vue.use(VueMaterial)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
