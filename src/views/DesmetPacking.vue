<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="12" sm="12"  justify-center align-center >
        <h1>Add Pallet</h1>
        <!-- <h2>Inspection page</h2> -->
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col justify-center align-center cols="12" sm="12" class="text-center">
        <FormDesmetPacking />
      </v-col> 
    </v-row>
    <v-container>
      Pallets added to vuex: {{ palletsPBFNO }}
    </v-container>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import FormDesmetPacking from "../components/Desmet/FormDesmetPacking.vue";
export default {
  components: {
    FormDesmetPacking,
  },
  data() {
    return {};
  },
  methods: {
    // ...mapState(["desmetOrder"]),
  },
  computed: {
    ...mapState(["palletsPBFNO"]),
  },
  created() {},
};
</script>

<style>
</style>