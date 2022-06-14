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
        <v-col v-for="(item, i) in InspectionsFromFirestore" cols="4" :key="i">
          <v-card>
            <v-img
              src="../../../public/img/actuator.jpeg"
              height="200px"
            ></v-img>
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
              <v-btn
                color="deep-purple lighten-2"
                text
                @click="downloadPDF(item.inspection)"
              >
                Download PDF
              </v-btn>
              <v-btn
                color="deep-purple lighten-2"
                text
                @click="showDataReports(item.inspection)"
              >
                Show Data
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- MODAL -->
    <v-dialog v-model="modalShowData" persistent max-width="600px">
      <v-card v-if="currentData">
        <v-card-title>
          <span class="text-h5"> Inspection number <strong>{{ currentData.id }}</strong> </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-autocomplete
                  v-model="currentDataIndex"
                  label="Pick an actuator to check"
                  :items="currentDataActuators"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Actuator model"
                  v-model="currentData.data[currentDataIndex].actuatorModel"
                  
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Actuator Serial Number"
                  
                  v-model="
                    currentData.data[currentDataIndex].actuatorSerialNumber
                  "
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Control pack"
                  
                  v-model="currentData.data[currentDataIndex].controlPack"
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-select
                  v-model="currentData.data[currentDataIndex].visual"
                  label="Visual"
                  :items="items"
                >
                </v-select>
                <v-select
                  v-model="currentData.data[currentDataIndex].waterInspection"
                  label="Water inspection"
                  :items="items"
                ></v-select>
                <v-select
                  label="Operational test"
                  v-model="currentData.data[currentDataIndex].operationalTest"
                  :items="items"
                ></v-select>
                <v-select
                  label="Wire  compartiment"
                  v-model="currentData.data[currentDataIndex].wireCompartiment"
                  :items="items"
                ></v-select>
                <v-select
                  label="Handwheel bolt pattern"
                  v-model="
                    currentData.data[currentDataIndex].handwheelBoltPatern
                  "
                  :items="items"
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="currentData.data[currentDataIndex].observaciones"
                  label="Observaciones"
                  type="textarea"
                  
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>

          <!-- <small>indicates required field</small> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="modalShowData = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="updatingData">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      currentData: null,
      currentDataIndex: 0,
      modalShowData: false,
      items: ["Good", "Bad", "Not sure"],
    };
  },
  created() {
    this.getInspections();
    // console.log("inspectionsFromFirestore", this.InspectionsFromFirestore);
  },
  computed: {
    ...mapState(["actuators", "allInpections", "InspectionsFromFirestore"]),

    isInspectionCreated() {
      return this.InspectionsFromFirestore.length;
    },
    currentDataActuators() {
      console.log("item ", this.currentData);
      return this.currentData.data.map((item, index) => ({
        text: `${item.actuatorModel} - ${item.actuatorSerialNumber}`,
        value: index,
      }));
    },
  },
  methods: {
    ...mapActions(["getInspections", "updatingInspection"]),

    showDataReports(inspection) {
      console.log("inspecction", inspection);
      this.currentData = inspection;
      this.modalShowData = true;
    },
    downloadPDF(data) {
      pdfGenerator(data);
    },
    updatingData() {
      /*
      vuex -> update InspectionsFromFirestore ->
          --> firestore -> update -> actuliza el state
      */
      // try {
      console.log("updatingData", this.currentData);
      this.$store.dispatch("updatingInspection", this.currentData);
      this.modalShowData = false;
      // } catch (e) {
      //   console.log(e);
      // }
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
