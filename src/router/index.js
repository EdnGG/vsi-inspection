import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
  }
]

const router = new VueRouter({
  routes
})

export default router
