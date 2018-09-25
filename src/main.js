// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
import Mint from 'mint-ui'
import Vuex from "vuex"
Vue.use(Vuex)
Vue.use(Mint)
Vue.use(Vant)
Vue.config.productionTip = false

const store = new Vuex.Store({
	state:{
	  	userid:""
	},
	mutations:{
      change(state,b){
        state.userid = b;
        console.log(b)
        localStorage.setItem('userid', b)
      }
  }
})

for(let i in store.state) {
  localStorage.getItem(i) ? store.state[i] = localStorage.getItem(i) : ''
}




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
