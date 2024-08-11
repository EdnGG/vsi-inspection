import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthLayout from '../layouts/Auth.vue';
import MainLayout from '../layouts/Main.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'Login',
        component: () =>
          import(/* webpackChunkName: "login" */ '../views/Login.vue'),
      },
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
          import(/* webpackChunkName: "signup" */ '../views/SignUp.vue'),
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
          import(
            /* webpackChunkName: "forgot-password" */ '../views/ForgotPassword.vue'
          ),
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
            /* webpackChunkName: "inspections" */ '../views/inspection/index.vue'
          ),
        meta: { requiresAuth: true },
      },
      {
        path: 'details',
        name: 'details',
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
            /* webpackChunkName: "details/:uid" */ '../views/inspection/details/[uid].vue'
          ),
        meta: { requiresAuth: true },
      },
      {
        path: 'pending-inspections',
        name: 'pending-inspections',
        component: () =>
          import(
            /* webpackChunkName: "pending-inspection" */ '../views/inspection/pending-inspection/index.vue'
          ),
        meta: { requiresAuth: true },
      },
      {
        path: 'pending-inspections/:id',
        name: 'pending-inspections-id',
        component: () =>
          import(
            /* webpackChunkName: "pending-inspections/:id" */ '../views/inspection/pending-inspection/[uid].vue'
          ),
        meta: { requiresAuth: true },
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () =>
          import(
            /* webpackChunkName: "details" */ '../views/notFound/index.vue'
          ),
        meta: { requiresAuth: true },
      },
    ],
  },
  // {
  //   path: '/desmet/packing',
  //   name: 'DesmetPacking',
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/desmet/packing.vue'),
  //   meta: { requiresAuth: true },
  // },
  // {
  //   path: '/desmet/pallets',
  //   name: 'DesmetPallets',
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/desmet/pallets.vue'),
  //   meta: { requiresAuth: true },
  // },
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
      console.log('else');
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
