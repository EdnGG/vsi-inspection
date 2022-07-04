<template>
  <v-snackbar
  
      v-model="snackbar.show"
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          @click="$store.commit('hideSnackbar')"
          color="blue"
          text
          v-bind="attrs"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    snackbar: this.snackbar,
  }),
  computed: {
    ...mapState("inspection", ["snackbar"]),
  },
};
</script>

<style lang="sass">
div.v-snack:not(.v-snack--absolute)
  height: 100%
</style>