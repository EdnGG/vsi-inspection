export const showSnackbar = {
  success: (commit, msg) => {
    commit('utils/SHOW_MESSAGE', { msg, theme: '#1A237E', show: true }, { root: true });
  },
  error: (commit, msg) => {
    commit('utils/SHOW_MESSAGE',  { msg, theme: '#880E4F', show: true }, { root: true });
  },
};
 