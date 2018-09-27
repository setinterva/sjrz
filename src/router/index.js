import Vue from 'vue'
import Router from 'vue-router'
import Indexs from '../components/index'          //首页
import Enterprise from '../components/enterprise'     //企业商户
import Individual from '../components/individual'    //个体户
import Personage from '../components/personage'     //个人收款
import Logo from '../components/logo'     //
import Logo1 from '../components/logo1'     //个人收款
import Logo2 from '../components/logo2'     //个人收款
import Logo3 from '../components/logo3'     //个人收款
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
      component: Enterprise,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },{
      path: '/individual',
      name: 'Individual',
      component: Individual,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },{
      path: '/personage',
      name: 'Personage',
      component: Personage,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },{
      path: '/logo',
      name: 'Logo',
      component: Logo
    },{
      path: '/logo1',
      name: 'Logo1',
      component: Logo1
    },{
      path: '/logo2',
      name: 'Logo2',
      component: Logo2
    },{
      path: '/logo3',
      name: 'Logo3',
      component: Logo3
    }
  ]
})
