<template>
  <v-container fluid>
    <v-container>
      <v-row class="text-center">
        <v-col cols="12" sm="12" justify-center align-center class="info">
          <h1>View Inspection</h1>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="!isInspectionCreated">
      <v-row class="text-center">
        <v-col cols="12" sm="12" justify-center align-center>
          <NoContent :message="message"> </NoContent>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="d-flex d-wrap">
      <div
        class="d-flex d-wrap card-container"
        v-if="isInspectionCreated"
        v-for="(allInspection, i) in InspectionsFromFirestore"
        :key="i"
      >
        <inspection-card-details
          v-for="(inspection, i) in allInspection"
          :key="i"
          :inspection="inspection"
        ></inspection-card-details>
      </div>
    </v-container>
    <!-- {{InspectionsFromFirestore.inspectionInfo}} -->
  </v-container>
</template>

<script>
import NoContent from "@/components/Tools/NoContent.vue";
import InspectionCardDetails from "@/components/inspection/card/Details.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    NoContent,
    InspectionCardDetails,
  },
  data() {
    return {
      message: "No Inspections to show",
      inspectionsArray: [],
    };
  },
  created() {
    this.getInspections();
    console.log("InspectionsFromFirestore", this.InspectionsFromFirestore);
  },
  computed: {
    ...mapState(["actuators", "allInpections", "InspectionsFromFirestore"]),
    isInspectionCreated() {
      return this.InspectionsFromFirestore.length > 0;
    },
  },
  methods: {
    ...mapActions(["getInspections"]),
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
