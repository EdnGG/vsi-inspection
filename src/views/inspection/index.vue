<template>
  <v-container fluid>
    <div id="add_inspection--title">
    <v-row class="text-center ">
      <v-col cols="12" sm="12" justify-center align-center >
        <h1>Add Inspection Report</h1>
        
      </v-col>
    </v-row>
  </div>
    <v-row class="text-center">
      <v-col justify-center align-center cols="12" sm="12" class="text-center">
        <inspection-form-actuators></inspection-form-actuators> 
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import InspectionFormActuators from '@/components/inspection/form/Actuators.vue';
export default {
  components: {
    InspectionFormActuators,
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm(
      "If you leave this page, all data it's going to be lost!",
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
#add_inspection--title {
  background-color: #2196f3;
  color: #fff;
  padding: 10px;
  border-radius: 20px;
  margin: 10px;
}
</style>

