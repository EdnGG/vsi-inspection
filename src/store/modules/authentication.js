import router from '../../router';
import { showSnackbar } from '../../helpers/snackbar';

import { newUser, login, signOut } from '../../services';

export default {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
      console.log('state.user: ', payload);
    },
  },
  actions: {
    isUserActive({ commit }, user) {
      console.log('user from actions/isUserActive: ', user);
      commit('SET_USER', user);
    },
    async signOut() {
      try {
        await signOut();
        router.push('/');
      } catch (err) {
        console.error('error: ', err);
      }
    },
    async loginUser({ commit }, payload) {
      try {
        const res = await login(payload);
        commit('SET_USER', res);
        showSnackbar.success(commit, 'Login successful');
        showSnackbar.error(commit, 'Login successful');

        router.push('/inspection/details');
      } catch (err) {
        console.error('error: ', err);
      }
    },
    async createUser({ commit }, payload) {
      try {
        const res = await newUser(payload);
        commit('SET_USER', res);
        router.push('/inspection/details');
      } catch (err) {
        console.error('error: ', err);
      }
    },
  },
  getters: {
    isUserExist(state) {
      if (state.user === null) {
        return false;
      } else {
        return true;
      }
    },
  },
};
