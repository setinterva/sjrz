import Vue from 'vue'
import Router from 'vue-router'
import Indexs from '../components/index'          //首页
import Enterprise from '../components/enterprise'     //企业商户
import Individual from '../components/individual'    //个体户
import Personage from '../components/personage'     //个人收款
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect : "/index"
    },{
      path: '/index',
      name: 'Indexs',
      component: Indexs
    },{
      path: '/enterprise',
      name: 'Enterprise',
      component: Enterprise
    },{
      path: '/individual',
      name: 'Individual',
      component: Individual
    },{
      path: '/personage',
      name: 'Personage',
      component: Personage
    }
  ]
})
