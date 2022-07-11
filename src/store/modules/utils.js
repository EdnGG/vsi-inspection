export default {
  namespaced: true,
  state: {
    msgSnackbar: '',
    showSnackbar: false,
    themeSnackbar: '',
  },
  mutations: {
    SHOW_MESSAGE(state, payload) {
      console.log('payload utils module: ', payload);
      if (!payload.show) {
        state.showSnackbar = false;
      } else {
        state.themeSnackbar = payload.theme;
        state.msgSnackbar = payload.msg;
        state.showSnackbar = payload.show;
      }
    }
  },
  getters: {},
};
