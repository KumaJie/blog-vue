import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import main from '../components/blog-main.vue'
import editor from '../views/blog-editor.vue'
import detail from '../components/blog-detail.vue'
import login from '../views/blog-login.vue'
import register from '../views/blog-register.vue'
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
        path: 'editor',
        component: editor
      }, {
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router