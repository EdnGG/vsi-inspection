import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';

import { auth } from './firebase.js';

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('user: ', user);
    const userDetected = {
      uid: user.uid,
      email: user.email,
    };
    store.dispatch('authentication/isUserActive', userDetected);
  } else {
    // console.log("user false: ", user);
    store.dispatch('authentication/isUserActive', user);
  }
});

Vue.use(require('vue-moment'));
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
