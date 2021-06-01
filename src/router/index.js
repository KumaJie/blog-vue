import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import main from '../components/blog-main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: index,
    children:[
      {
        path: '',
        component: main
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
