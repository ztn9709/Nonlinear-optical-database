import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/Index.vue')
  },

  {
    path: '/echarts',
    name: 'Echarts',
    component: () => import('../views/Echarts.vue')
  },

  {
    path: '/awesome',
    name: 'AweSome',
    component: () => import('../views/AweSome.vue')
  },
  {
    path: '/display/:formula',
    name: 'Display',
    props: true,
    component: () => import('@/views/Display.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
