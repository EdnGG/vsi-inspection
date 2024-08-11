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
    
    <v-container v-if="!pendingInspections">
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
        v-for="(item, i) in pendingInspections" 
        :key="i" > 
        
          <v-card>
            <v-img
              src="../../../../public/img/actuator.jpeg"
              height="200px"
            ></v-img>
            <v-card-title>
              <span class="mr-2"> # {{ item.id }} </span>
              <v-chip small> {{ item.date }}</v-chip>
            </v-card-title>

            <v-card-text>
              <div class="my-4 text-subtitle-1">
                {{ item.technical }}
              </div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title>Inspection</v-card-title>
            <v-card-actions>
             
              <v-btn
                color="deep-purple lighten-2"
                text
                @click="showPendingInspection(item)"
              >
                Go back to Inspection
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


export default {
  components: {
    NoContent: defineAsyncComponent(() =>
      import('@/components/Tools/NoContent.vue'),
    ),
    InspectionCardDetails: defineAsyncComponent(() =>
      import('@/components/inspection/card/Details.vue'),
    ),
  },
  data() {
    return {
      lastDocument: null,
      limit: 3,
      totalInspections: null,
      message: 'No Inspections to show',
      currentData: null,
      pendingInspections: null,
      modalShowData: false,
    };
  },
  updated() {
    
  },
  mounted() {
    this.getInspectionFromLocalStorage();
  },
  created() {
    // this.getInspectionFromLocalStorage();
  },
  computed: {
    // ...mapState('inspection', ['']),

  },
  methods: {
    ...mapActions('inspection', [
      'updatingInspection',
      'getInspections',
      'getPagination',
      'pendingInspection',
    ]),
    getInspectionFromLocalStorage() {
      this.pendingInspections = JSON.parse(
        localStorage.getItem('continueInspectionLater'),
      );

      console.log('this.pendingInspections', this.pendingInspections);
    },
    showPendingInspection(item) {
      console.log('Pending Inspection', item);
      this.currentData = item;
      this.modalShowData = true;
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