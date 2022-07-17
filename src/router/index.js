import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import AuthLayout from '../layouts/Auth.vue';
import MainLayout from '../layouts/Main.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: AuthLayout,
    children: [{ path: '', component: Login }],
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: AuthLayout,
    children: [
      {
        path: '',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/SignUp.vue'),
      },
    ],
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: AuthLayout,
    children: [
      {
        path: '',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/ForgotPassword.vue'),
      },
    ],
  },
  {
    path: '/inspection',
    name: 'Inspection',
    component: MainLayout,
    children: [
      {
        path: '',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/inspection/index.vue'
          ),
        meta: { requiresAuth: true },
      },
      {
        path: 'details',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/inspection/details.vue'
          ),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/desmet/packing',
    name: 'DesmetPacking',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/desmet/packing.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/desmet/pallets',
    name: 'DesmetPallets',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/desmet/pallets.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/about/index.vue'),
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const isUserExist = store.getters['authentication/isUserExist'];
    if (isUserExist) {
      next();
    } else {
      next({
        path: '/',
        query: { redirect: to.fullPath },
      });
    }
  } else {
    next();
  }
});

export default router;
