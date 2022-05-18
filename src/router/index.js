import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import { auth } from '../firebase.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUp.vue')
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import(/* webpackChunkName: "about" */ '../views/ForgotPassword.vue'),
  },
  {
    path: '/inspection',
    name: 'Inspection',
    component: () => import(/* webpackChunkName: "about" */ '../views/Inspection.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/view-inspection',
    name: 'ViewInspection',
    component: () => import(/* webpackChunkName: "about" */ '../views/ViewInspection.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/desmet',
    name: 'Desmet',
    component: () => import(/* webpackChunkName: "about" */ '../views/Desmet.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/desmet-packing',
    name: 'DesmetPacking',
    component: () => import(/* webpackChunkName: "about" */ '../views/DesmetPacking.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/desmet-pallets',
    name: 'DesmetPallets',
    component: () => import(/* webpackChunkName: "about" */ '../views/DesmetPallets.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { requiresAuth: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => { 
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = auth.currentUser
    if (!user) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else { 
      next()
    }
  } else { 
    next()
  }
})

export default router
