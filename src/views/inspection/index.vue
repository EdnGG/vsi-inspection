<template>
  <v-container fluid>
    <v-row class="text-center pa-6 ma-2 ">
      <v-col 
        cols="12" 
        sm="12" 
        justify-center align-center 
        class="primary">
        <h1 class="title">Inspection Form</h1>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col justify-center align-center cols="12" sm="12" class="text-center">
        <inspection-form-actuators></inspection-form-actuators>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import InspectionFormActuators from "@/components/inspection/form/Actuators.vue";
export default {
  components: {
    InspectionFormActuators,
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm(
      "Do you really want to leave? you have unsaved changes!"
    );
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
};
</script>

<style scoped>
.primary {
  background-color: #fafafa;
}
.title {
  font-size: 1.5rem;

  font-weight: bold;

  color: #000;

  margin-bottom: 0;

  margin-top: 0;

  margin-left: 0;

  margin-right: 0;

  padding-left: 0;
  padding-right: 0;

  padding-top: 0;
  padding-bottom: 0;

  text-align: center;

  text-transform: uppercase;

  letter-spacing: 0.1rem;

  line-height: 1.5rem;

  text-decoration: none;

  text-shadow: none;
}
</style>