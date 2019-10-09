import Vue from 'vue'
import App from './App.vue'
// import 'bootstrap/scss/bootstrap.scss'
import 'bulma'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
