import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },

  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/Index.vue')
  },

  {
    path: '/echarts',
    name: 'Echarts',
    component: () => import('@/views/Echarts.vue')
  },

  {
    path: '/materials/:mid',
    name: 'Material',
    props: true,
    component: () => import('@/views/Material.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
