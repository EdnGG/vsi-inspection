import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/inspection',
    name: 'Inspection',
    component: () => import(/* webpackChunkName: "about" */ '../views/Inspection.vue')
  },
  {
    path: '/view-inspection',
    name: 'ViewInspection',
    component: () => import(/* webpackChunkName: "about" */ '../views/ViewInspection.vue')
  },
  {
    path: '/desmet',
    name: 'Desmet',
    component: () => import(/* webpackChunkName: "about" */ '../views/Desmet.vue')
  },
  {
    path: '/desmet-packing',
    name: 'DesmetPacking',
    component: () => import(/* webpackChunkName: "about" */ '../views/DesmetPacking.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
