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
          <NoContent :message="message" /> 
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

            <v-card-title>Inspection</v-card-title>
            <v-card-actions>
              <v-btn color="deep-purple lighten-2" text @click="downloadPDF(i)"> Download PDF </v-btn>
              <v-btn color="deep-purple lighten-2" text @click="showDataReports(item.inspection)"> Show Data </v-btn>
            </v-card-actions>
          </v-card>
           <!-- MODAL -->
     <v-dialog
      v-model="modalShowData"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Inspection number {{item.inspection.id}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Actuator model"
                  required
                >hjhjh{{item.inspection.data.actuatorModel}}</v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Actuator Serial Number"
                >{{item.inspection.data.actuatorSerialNumber}}</v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Control pack"
                  persistent-hint
                  required
                >{{item.inspection.data.controlPack}}</v-text-field>
              </v-col>
              <!--  -->
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  label="Visual"
                  :items="['Good', 'Bad', 'Not sure']"
                  required
                ></v-select>
                 <v-select
                  label="Water inspection"
                  :items="['Good', 'Bad', 'Not sure']"
                  required
                ></v-select>
                 <v-select
                  label="Operational test"
                  :items="['Good', 'Bad', 'Not sure']"
                  required
                ></v-select>
                 <v-select
                  label="Wire  compartiment"
                  :items="['Good', 'Bad', 'Not sure']"
                  required
                ></v-select>
                 <v-select
                  label="Handwheel bolt pattern"
                  :items="['Good', 'Bad', 'Not sure']"
                  required
                ></v-select>
              </v-col>

              <!--  -->
              <v-col cols="12">
                <v-text-field
                  label="Observaciones"
                  type="textarea"
                  required
                >{{item.inspection.data.observaciones}}</v-text-field>
              </v-col>
              
              <v-col
                cols="12"
                sm="6"
              >
                <!-- <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete> -->
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="modalShowData = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        </v-col>
      </v-row>
     
    </v-container>

    
   
  </v-container>
</template>

<script>
import NoContent from "@/components/Tools/NoContent.vue";
import InspectionCardDetails from "@/components/inspection/card/Details.vue";
import { mapState, mapActions } from "vuex";
import pdfGenerator from "@/helpers/pdfGenerator.js";

export default {
  components: {
    NoContent,
    InspectionCardDetails,
  },
  data() {
    return {
      message: "No Inspections to show",
      currentData: {},
      modalShowData: false,
    };
  },
  updated() {
    // if(this.InspectionsFromFirestore)
  },
  created() {
    // checar como puedo hacer que se cargue la data de firestore cuando se agrege un nuevo registro
    // if(){this.InspectionsFromFirestore}
    this.getInspections();
    this.updatingData();
    // console.log(
    //   "this.InspectionsFromFirestore",
    //   this.InspectionsFromFirestore[0].inspection
    // );
  },
  computed: {
    ...mapState(["actuators", "allInpections", "InspectionsFromFirestore"]),
    isInspectionCreated() {
      return this.InspectionsFromFirestore.length;
    },
  },
  methods: {
    ...mapActions(["getInspections"]),
    showDataReports(inspecction) {
      this.currentData = inspecction;
      this.modalShowData = true;
    },
    downloadPDF(i) {
      pdfGenerator(this.InspectionsFromFirestore[i].inspection);
    },
    updatingData() {
      this.InspectionsFromFirestore.map((inspection) => {
        console.log("hey", inspection);
      });
      // if(this.InspectionsFromFirestore.)
    },
    showDataReports(data) {
      this.currentData = data;
      this.modalShowData = true;
    },
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
