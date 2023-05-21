<template>
  <v-snackbar v-model="showSnackbar" :multi-line="true" :color="themeSnackbar">
    {{ msgSnackbar }}
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="showSnackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'CustomSnackbar',
  computed: {
    showSnackbar: {
      get() {
        return this.$store.state.utils.showSnackbar;
      },
      set(value) {
        this.$store.commit(
          'utils/SHOW_MESSAGE',
          { show: value },
          { root: true },
        );
      },
    },
    msgSnackbar() {
      return this.$store.state.utils.msgSnackbar;
    },
    themeSnackbar() {
      return this.$store.state.utils.themeSnackbar;
    },
  },
};
</script>
