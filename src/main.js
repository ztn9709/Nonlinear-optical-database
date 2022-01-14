import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'


import ElementUI from 'element-ui';
import './assets/element_styles/fall/theme/index.css';


import 'vue-awesome/icons/flag';
import Icon from 'vue-awesome/components/Icon'


Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Icon.register({
  "vue": {
    width: 200,
    height: 180,
    paths: [
      {
        d: "M161,4h-38l-23,40l-23-40h-38l61,103L161,4z",
        fill: "rgb(57,73,92)"
      }, {
        d: "M200,4h-39l-61,103l-61-103h-39l100,172L200,4z", fill: "rgb(100,180,135)"
      }]
  }
})
Vue.component('v-icon', Icon)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
