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
    component: AuthLayout,
    children: [
      { path: '', name: 'Login', component: Login }
    ],
  },
  {
    path: '/signup',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'SignUp',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/SignUp.vue'),
      },
    ],
  },
  {
    path: '/forgot-password',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'ForgotPassword',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/ForgotPassword.vue'),
      },
    ],
  },
  {
    path: '/inspection',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Inspection',
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
            /* webpackChunkName: "details" */ '../views/inspection/details/index.vue'
          ),
        meta: { requiresAuth: true },
      },
      {
        path: 'details/:uid',
        name: 'inspection_details_uid',
        component: () =>
          import(
            /* webpackChunkName: "details" */ '../views/inspection/details/[uid].vue'
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