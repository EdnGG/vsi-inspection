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
          <span class="text-h5"> Inspection number {{ currentData.id }} </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-autocomplete
                  v-model="currentDataIndex"
                  label="Seleccionar el motor a revisar"
                  :items="currentDataActuators"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="*Actuator model"
                  v-model="currentData.data[currentDataIndex].actuatorModel"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="*Actuator Serial Number"
                  required
                  v-model="
                    currentData.data[currentDataIndex].actuatorSerialNumber
                  "
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="*Control pack"
                  required
                  v-model="currentData.data[currentDataIndex].controlPack"
                >
                </v-text-field>
              </v-col>
             
              <v-col cols="12" sm="6">
                <!-- Necesito agarrar el valor del vselect y mostrarlo en el cliente -->
                <v-text-field
                  v-model="currentData.data[currentDataIndex].visual"
                  label="*Visual"
                  required
                >
                </v-text-field>
                <v-text-field
                  v-model="currentData.data[currentDataIndex].waterInspection"
                  label="*Water inspection"
                  required
                ></v-text-field>
                <v-text-field
                  label="*Operational test"
                  v-model="currentData.data[currentDataIndex].operationalTest"
                  required
                ></v-text-field>
                <v-text-field
                  label="*Wire  compartiment"
                  v-model="currentData.data[currentDataIndex].wireCompartiment"
                  required
                ></v-text-field>
                <v-text-field
                  label="*Handwheel bolt pattern"
                  v-model="
                    currentData.data[currentDataIndex].handwheelBoltPatern
                  "
                  required
                ></v-text-field>

                <!-- V-SELECTS -->

                <!--<v-select
                  :value="currentData.data[currentDataIndex].state"
                  v-model="getNewValue"
                  @change="newValueSelected($event)"
                  label="*Visual"
                  :items="item"
                  required
                >
                </v-select>
                <v-select
                  :value="currentData.data[currentDataIndex].state"
                  v-model="getNewValue"
                  @change="newValueSelected($event)"
                  label="*Water inspection"
                  :items="item"
                  required
                ></v-select>
                <v-select
                  @change="newValueSelected($event)"
                  label="*Operational test"
                  v-model="currentData.data[currentDataIndex].operationalTest"
                  :items="item"
                  required
                ></v-select>
                <v-select
                  @change="newValueSelected($event)"
                  label="*Wire  compartiment"
                  v-model="currentData.data[currentDataIndex].wireCompartiment"
                  :items="item"
                  required
                ></v-select>
                <v-select
                  @change="newValueSelected($event)"
                  label="*Handwheel bolt pattern"
                  v-model="currentData.data[currentDataIndex].handwheelBoltPatern"
                  :items="item"
                  required
                ></v-select>  -->
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="currentData.data[currentDataIndex].observaciones"
                  label="*Observaciones"
                  type="textarea"
                  required
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>

          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="modalShowData = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="updatingData(currentData)"> 
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
      item: ["Good", "Bad", "Not sure"],
    };
  },
  created() {
    this.getInspections();
    this.updatingData();
  },
  computed: {
    ...mapState(["actuators", "allInpections", "InspectionsFromFirestore"]),
    getNewValue: {
      get() {
        return this.currentData.data[this.currentDataIndex];
      },
      set(value) {
        this.currentData.data[this.currentDataIndex] = value;
      },
    },
    isInspectionCreated() {
      return this.InspectionsFromFirestore.length;
    },
    currentDataActuators() {
      return this.currentData.data.map((item, index) => ({
        text: `${item.actuatorModel} - ${item.actuatorSerialNumber}`,
        value: index,
      }));
    },
  },
  methods: {
    ...mapActions(["getInspections", "updatingInspection"]),
    newValueSelected(event) {
      console.log(event);
    },

    showDataReports(inspecction) {
      this.currentData = inspecction;
      this.modalShowData = true;
    },
    downloadPDF(data) {
      pdfGenerator(data);
    },
    updatingData(data) {
      /*
      vuex -> update InspectionsFromFirestore ->
          --> firestore -> update -> actuliza el state
      */
      // try {
      console.log("updatingData", data);
      this.$store.dispatch("updatingInspection", data);
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
