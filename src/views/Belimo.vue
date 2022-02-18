<template>
  <!-- <v-container> -->
    <div>
  <kronogram-component />
  <!-- </v-container> -->
  </div>
</template>

<script>
export default {
  components: {
    "kronogram-component": require("@/components/KronogramComponent.vue")
      .default,
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>