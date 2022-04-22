<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="12" sm="12"  justify-center align-center class="primary">
        <h1>Desmet</h1>
        <!-- <h2>Inspection page</h2> -->
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col justify-center align-center cols="12" sm="12" class="text-center">
        <FormDesmet
        
        />
      </v-col> 
    </v-row>
    <v-container>
      From firebase: {{ showDesmetOrder }}
    </v-container>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import FormDesmet from "../components/Desmet/FormDesmet.vue";
export default {
  components: {
    FormDesmet,
  },
  data() {
    return {
      showDesmetOrder: [],
    };
  },
  methods: {
    // ...mapState(["desmetOrder"]),
  },
  computed: {
    ...mapState(["desmetOrder"]),
  },
  created() {
    this.showDesmetOrder = this.desmetOrder;
  },
};
</script>

<style>
</style>