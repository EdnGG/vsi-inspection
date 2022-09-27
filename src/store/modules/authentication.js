import router from "../../router";
import { showSnackbar } from '../../helpers/snackbar';

import { newUser, login, signOut, resetPass } from "../../services";

export default {
  namespaced: true,
  state: {
    user: null,
    snackbar: {
      show: false,
      text: '',
    },
  },
  mutations: {
    SHOW_SNACKBAR (state, payload) {
      let timeout = 0
      if (state.snackbar.show) {
        state.snackbar.show = false
        timeout = 300
      }
      setTimeout(() => {
        state.snackbar.show = true,
          state.snackbar.text = payload
      }, timeout)
    },
    SET_USER(state, payload) {
      state.user = payload;
      // console.log("state.user: ", payload);
    },
  },
  actions: {
    isUserActive({ commit }, user) {
      // console.log("user from actions/isUserActive: ", user);
      commit("SET_USER", user);
    },
    async signOut({ commit }) {
      try {
        await signOut();
        showSnackbar.success(commit, 'Logout successful');
        router.push("/");
      } catch (err) {
        showSnackbar.error(commit, err.message);
        console.error("error: ", err);
      }
    },
    async loginUser({ commit }, payload) {
      try {
        const res = await login(payload);
        commit("SET_USER", res);
        showSnackbar.success(commit, 'Login successful');
        router.push("/inspection/details");
      } catch (err) {
        showSnackbar.error(commit, err.message);
        console.error("error: ", err);
      }
    },
    async createUser({ commit }, payload) {
      try { 
        const res = await newUser(payload);
        commit("SET_USER", res);
        showSnackbar.success(commit, 'User created successfully');
        router.push("/inspection/details");
      } catch (err) {
        showSnackbar.error(commit, err.message);
        console.error("error: ", err);
      }
    },
    async resetPassword({ commit }, payload) {
      try {
        await resetPass(payload);
        showSnackbar.success(commit, 'Please check your email inbox and your spam folder');
        router.push("/");
      } catch (err) {
        showSnackbar.error(commit, err.message);
        console.error("error: ", err);
      }
    }
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
