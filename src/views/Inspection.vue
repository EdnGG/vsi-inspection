<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="12" sm="12"  justify-center align-center class="primary">
        <h1>Inspection</h1>
        <h2>Inspection page</h2>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col justify-center align-center cols="12" sm="12" class="text-center">
        <form-actuators />
      </v-col> 
    </v-row>
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