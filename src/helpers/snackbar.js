export const showSnackbar = {
  success: (commit, msg) => {
    commit('utils/SHOW_MESSAGE', { msg, theme: 'success', show: true }, { root: true });
  },
  error: (commit, msg) => {
    commit('utils/SHOW_MESSAGE',  { msg, theme: 'red', show: true }, { root: true });
  },
};
