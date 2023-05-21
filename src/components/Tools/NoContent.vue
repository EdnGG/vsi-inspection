<template>
  <div class="no-tasks">
    <v-icon size="100" color="primary"> mdi-check </v-icon>
    <div class="text-h5 primary--text">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['message'],
  name: 'NoContent',
  data() {
    return {};
  },
};
</script>

<style lang="sass">
.no-tasks
  position: absolute,
  left: 50%,
  top: 50%,
  transform: translate(-50%, -50%),
  opacity: 0.5
</style>
