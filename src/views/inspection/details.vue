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
      <v-row>
        <v-col v-for="(item, i) in InspectionsFromFirestore" cols="4">
          <v-card>
            <v-card-title>
              <span class="mr-2"> # {{ item.inspection.id }} </span>
              <v-chip small> {{ item.inspection.date }}</v-chip>
            </v-card-title>

            <v-card-text>
              <div class="my-4 text-subtitle-1">
                {{ item.inspection.technical }}
              </div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title>Actu</v-card-title>
            <v-card-actions>
              <v-btn color="deep-purple lighten-2" text> Download PDF </v-btn>
              <v-btn color="deep-purple lighten-2" text @click="showDataReports(item.inspection)"> Show Data </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- {{InspectionsFromFirestore.inspectionInfo}} -->
    <!-- MODAL v-model="modalShowData" -->
    <!-- {{currentData}} -->
    <!-- MODAL v-model -->
  </v-container>
</template>

<script>
import NoContent from '@/components/Tools/NoContent.vue';
import InspectionCardDetails from '@/components/inspection/card/Details.vue';
import { mapState, mapActions } from 'vuex';
export default {
  components: {
    NoContent,
    InspectionCardDetails,
  },
  data() {
    return {
      message: 'No Inspections to show',
      inspectionsArray: [],
      currentData: {},
      modalShowData: false,
    };
  },
  created() {
    this.getInspections();
    console.log('InspectionsFromFirestore', this.InspectionsFromFirestore);
  },
  computed: {
    ...mapState(['actuators', 'allInpections', 'InspectionsFromFirestore']),
    isInspectionCreated() {
      return this.InspectionsFromFirestore.length > 0;
    },
  },
  methods: {
    ...mapActions(['getInspections']),
    showDataReports(data) {
      this.currentData = data;
      this.modalShowData = true;
    }
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
