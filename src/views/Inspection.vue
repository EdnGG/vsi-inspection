<template>
  <v-container>
    <h1>Inspection</h1>
    <h2>Inspection page</h2>
    <form-actuators />
    <!-- <actuator /> -->
  </v-container>
</template>

<script>
// import FormActuators from '../components/FormActuators.vue'
export default {
  components: {
    // 'actuator': require('@/components/Actuator.vue').default,
    "form-actuators": require("@/components/FormActuators.vue").default,
  },
};
</script>

<style>
</style>