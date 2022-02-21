<template>
  <v-container fluid> 
    <v-row class="text-center">
      <v-col cols="12" sm="12" justify-center align-center class="info">
        <h1>View Inspection</h1>
      </v-col>
    </v-row>
    <v-container>
      <v-row class="text-center">
      <v-col cols="12" sm="12" justify-center align-center>
        <h1>Inspections</h1>
        <p>{{inspections}}</p>
      </v-col>
    </v-row>
    </v-container>
  </v-container>

</template>

<script>
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(["inspections"]),
  },
};
</script>

<style>
</style>