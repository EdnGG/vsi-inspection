<template>
  <v-container fluid>
    <v-container>
      <div id="view_inspection--title">
      <v-row class="text-center">
        <v-col cols="12" sm="12" justify-center align-center >
          <h1>Pending Inspection Reports</h1>
        </v-col>
      </v-row>
    </div> 
    </v-container>
    <v-container v-if="!pendingInspection">
      <v-row class="text-center">
        <v-col cols="12" sm="12" justify-center align-center>
          <NoContent :message="message" />
        </v-col>
      </v-row>
    </v-container>


    <v-container class="d-flex d-wrap">
      <v-row>
        <v-col 
        cols="12" sm="12" md="6" lg="4" xl="3"
        >
        <!-- v-for="(item, i) in InspectionsFromFirestore" 
        :key="i" --> 
        
          <v-card>
            <v-img
              src="../../../../public/img/actuator.jpeg"
              height="200px"
            ></v-img>
              <!-- @loaded="lastDocument = item.inspection.id" -->
            <v-card-title>
              <span class="mr-2"> # {{currentDataUID}} </span>
              <v-chip small> Inspection date</v-chip>
            </v-card-title>

            <v-card-text>
              <div class="my-4 text-subtitle-1">
                Technical
              </div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title>Inspection</v-card-title>
            <v-card-actions>
              <!-- <v-btn
                color="deep-purple lighten-2"
                text
                @click="downloadPDF(item.inspection)"
              >
                Download PDF
              </v-btn> -->
              <v-btn
                color="deep-purple lighten-2"
                text
                @click="showDataReports(item)"
              >
                Show Data
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>


  </v-container>
</template>

<script>
import { defineAsyncComponent } from 'vue';

import { mapState, mapActions } from 'vuex';
import pdfGenerator from '@/helpers/pdfGenerator.js';

export default {
  components: {
    NoContent: defineAsyncComponent(() =>
      import('@/components/Tools/NoContent.vue'),
    ),
    InspectionCardDetails: defineAsyncComponent(() =>
      import('@/components/inspection/card/Details.vue'),
    ),
    inspectionPaginationIndex: defineAsyncComponent(() =>
      import('@/components/inspection/pagination/Index.vue'),
    ),
  },
  data() {
    return {
      lastDocument: null,
      limit: 3,
      totalInspections: null,
      message: 'No Inspections to show',
      currentData: null,
      currentDataUID: null,
      currentDataIndex: 0,
      modalShowData: false,
    };
  },
  updated() {
    //  console.log('actualizado', this.lastDocument);
    //  this.lastDocument =
    //    this.InspectionsFromFirestore[this.InspectionsFromFirestore.length - 1];
  },
  mounted() {
    //  if (this.isInspectionCreated) {
    //    return;
    //  }
    //  this.getInspections({ limit: 3, startAfter: this.lastDocument });
    // this.getInspections({ limit: this.limit });
  },
  created() {
    this.getInspectionFromLocalStorage();
  },
  computed: {
    ...mapState('inspection', ['pendingInspection']),

    //  ...mapState({
    //    InspectionsFromFirestore: (state) =>
    //      state.inspection.InspectionsFromFirestore,
    //    pagination: (state) => state.inspection.pagination,
    //  }),

    //  isInspectionCreated() {
    //    return this.InspectionsFromFirestore.length;
    //  },
    //  currentDataActuators() {
    //    return this.currentData.data.map((item, index) => ({
    //      text: `${item.actuatorModel} - ${item.actuatorSerialNumber}`,
    //      value: index,
    //    }));
    //  },
  },
  methods: {
    ...mapActions('inspection', [
      'updatingInspection',
      'getInspections',
      'getPagination',
      'pendingInspection',
    ]),
    getInspectionFromLocalStorage() {
      this.currentData = JSON.parse(
        localStorage.getItem('continueLaterInspection'),
      );
      console.log('this.currentData', this.currentData);

      // this.continueLaterInspection(this.currentData);

      // this.currentDataUID = this.currentData.uid;
      // this.currentDataIndex = this.currentData.index;
      // console.table('this.currentData table', this.currentData);
      // this.modalShowData = true;
    },

    showDataReports({ uid }) {
      this.$router.push({
        name: 'inspection_details_uid',
        params: { uid },
      });
    },
    downloadPDF(data) {
      pdfGenerator(data);
    },
  },
};
</script>

<style scoped>
#view_inspection--title {
  background-color: #2196f3;
  color: #fff;
  padding: 10px;
  border-radius: 20px;
  margin: 10px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
}
</style>