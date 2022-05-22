<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="12" sm="12" justify-center align-center class="info">
        <h1>View Inspection</h1>
      </v-col>
    </v-row>
    <v-container v-if="!InspectionsFromFirestore.length">
      <v-row class="text-center">
        <v-col cols="12" sm="12" justify-center align-center class="">
          <NoContent :message="message"> </NoContent>
        </v-col>
      </v-row>
    </v-container>
    <v-container 
      v-if="InspectionsFromFirestore.length"
      class="d-flex d-wrap"  
    >
      <v-row class="text-center">
        <v-col cols="12" sm="12" justify-center align-center class="">
          <!-- <h4>ggg{{ InspectionsFromFirestore }}</h4> -->
          <InspectionCard></InspectionCard>
          <InspectionCard></InspectionCard>
          <InspectionCard></InspectionCard>
          <InspectionCard></InspectionCard>
          <InspectionCard></InspectionCard>
          <InspectionCard></InspectionCard>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import NoContent from "@/components/Tools/NoContent.vue";
import InspectionCard from "@/components/Inspection/InspectionCard.vue";
import { mapState, mapActions } from "vuex";
// import InspectionCard from '../components/Inspection/InspectionCard.vue';
export default {
  components: {
    NoContent,
    InspectionCard,
  },
  data() {
    return {
      message: "No Inspections to show",
    };
  },
  mounted() {
    this.getInspections();
  },
  computed: {
    ...mapState(["actuators", "allInpections", "InspectionsFromFirestore"]),
  },
  methods: {
    ...mapActions(["getInspections"]),
  },
};
</script>

<style></style>
