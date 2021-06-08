import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import main from '../components/blog-main.vue'
import editor from '../views/blog-editor.vue'
import detail from '../components/blog-detail.vue'
import login from '../views/blog-login.vue'
import register from '../views/blog-register.vue'
import userInfo from '../views/blog-userInfo.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: index,
    children: [{
        path: '',
        component: main
      },
      {
        path: 'myblog/:userId',
        component: main
      },
      {
        path: 'editor',
        component: editor
      }, 
      {
        path: 'modify/:articleId',
        component: editor
      },
      {
        path: 'detail/:articleId',
        component: detail
      }
    ]
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/register',
    component: register
  },{
    path: '/userInfo',
    component: userInfo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router