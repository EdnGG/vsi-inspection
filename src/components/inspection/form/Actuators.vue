<template>
  <v-container>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1"> </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 2" step="2"> </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 3" step="3"> </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 4" step="4"> </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 5" step="5"> </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form ref="step1" lazy-validation>
            <v-row justify="space-between" class="mb-4">
              <v-col cols="12" md="3">
                <v-text-field
                  v-model.trim="totalInspection.id"
                  :rules="inspectionRules"
                  :counter="10"
                  label="Inspection #"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-menu
                  ref="menuDate"
                  v-model="menuDate"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="totalInspection.date"
                      label="Date"
                      prepend-icon="mdi-calendar"
                      :rules="inspectionRules"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="totalInspection.date"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menuDate = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menuDate.save(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model.trim="totalInspection.technical"
                  :rules="inspectionRules"
                  label="Technical Name"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <div class="d-flex">
            <v-btn color="primary" @click="nextStep1"> Continue </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-form ref="step2" lazy-validation>
            <v-row justify="space-between" class="mb-4">
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="tmpData.actuatorModel"
                  label="Actuator Model"
                  :rules="inspectionRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="tmpData.actuatorSerialNumber"
                  label="Actuator Serial Number"
                  :rules="inspectionRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="tmpData.controlPack"
                  label="Control Pack Model"
                  :rules="inspectionRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>

          <div class="d-flex">
            <v-btn color="primary" @click="nextStep2" class="mr-2">
              Continue
            </v-btn>
            <v-btn text @click="e1 = 1"> Back </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="3">
        <v-form ref="step3" lazy-validation>
          <core-custom-select
            v-model="tmpData.visual"
            title="Visual"
            
          ></core-custom-select>
          <core-custom-select
            v-model="tmpData.waterInspection"
            title="Water Inspection"
            
          ></core-custom-select>
          <core-custom-select
            v-model="tmpData.operationalTest"
            title="Operational Test"
            
          ></core-custom-select>
          <core-custom-select
            v-model="tmpData.wireCompartiment"
            title="Wire Compartiment"
            
          ></core-custom-select>
          <core-custom-select
            v-model="tmpData.handwheelBoltPatern"
            title="Handwheel Bolt Patern"
            
          ></core-custom-select>
          </v-form>
          <div class="d-flex">
            <v-btn color="primary" @click="nextStep3" class="mr-2">
              Continue
            </v-btn>
            <v-btn text @click="e1 = 2"> Back </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-row>
            <v-col cols="12">
              <v-container fluid>
                <v-textarea
                  v-model.trim="tmpData.observaciones"
                  clearable
                  clear-icon="mdi-close-circle"
                  label="Notes:"
                  required
                  :rules="inspectionRules"
                ></v-textarea>
              </v-container>
            </v-col>
          </v-row>

          <div class="d-flex">
            <v-btn
              class="mr-2"
              color="warning"
              @click="addActuator({ step: 2 })"
            >
              Add Actuator
            </v-btn>
            <v-btn
              color="primary"
              @click="addActuator({ step: 5 })"
              class="mr-2"
            >
              Continue
            </v-btn>
            <v-btn text @click="e1 = 3"> Back </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="5">
          <v-row>
            <v-col cols="12">
              <v-container fluid>
                <v-textarea
                  clearable
                  clear-icon="mdi-close-circle"
                  label="Final notes:"
                  v-model.trim="totalInspection.observaciones"
                ></v-textarea>
              </v-container>
            </v-col>
          </v-row>
          <!--  -->
          <v-dialog
            style="padding-top: 10px"
            v-model="modalSubmit"
            persistent
            max-width="500"
          >
            <v-card>
              <v-card-title class="text-h5">
                Are you sure sending inspection?
              </v-card-title>
              <v-card-text>
                Sending the inspection will be post on the DB and no change can
                be done.
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="modalSubmit = false">
                  Cancel
                </v-btn>
                <v-btn color="green darken-1" text @click="submit">
                  Submit Inspection
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <div class="d-flex">
            <!-- Actualizar tmpData anterior -->
            <v-btn text @click="e1 = 4" class="mr-2"> Back </v-btn>
            <v-btn color="primary" @click="modalSubmit = true">
              End inspection
            </v-btn>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import CoreCustomSelect from "@/components/core/CustomSelect.vue";
import { mapState } from "vuex";
import { mapActions } from "vuex";
// import pdfGenerator from "@/helpers/pdfGenerator.js";

export default {
  components: {
    CoreCustomSelect,
  },
  data: () => ({
    required: true,
    e1: 1,
    step1: null,
    step2: null,
    modalSubmit: false,
    firstVal: false,
    menuDate: false,
    prevButton: false,
    nextButton: false,
    select: { state: "", item: "Select one" },
    date: "",
    /* ***** */
    totalInspection: {
      id: "",
      date: "",
      technical: "",
      observaciones: "",
      data: [],
    },
    tmpData: {
      actuatorModel: "",
      actuatorSerialNumber: "",
      controlPack: "",
      visual: "",
      waterInspection: "",
      operationalTest: "",
      wireCompartiment: "",
      handwheelBoltPatern: "",
      observaciones: "",
    },
    inspectionRules: [(v) => !!v || "Field is required"],
    selectRules: [(v) => v.length > 0 || "Item is required in select 2"],
  }),
  computed: {
    ...mapState(["inspections", "allInspections"]),
    datosArray() {
      return [
        this.inspection.data.visual,
        this.inspection.data.waterInspection,
        this.inspection.data.operationalTest,
        this.inspection.data.wireCompartiment,
        this.inspection.data.handwheelBoltPatern,
      ].filter((item) => {
        if (item) {
          return item;
        }
      });
    },
    hide() {
      return {
        display: this.firstVal ? "none" : "block",
      };
    },
  },
  methods: {
    ...mapActions("inspection", ["addInspection"]),
    addActuator({ step }) {
      this.totalInspection.data.push(this.tmpData);
      this.$refs.step2.reset();
      this.e1 = step;
    },
    submit() {
      try {
        this.addInspection(this.totalInspection);
        // pdfGenerator(this.totalInspection);
        this.modalSubmit = false;
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    },
    nextStep1() {
      if (this.$refs.step1.validate()) {
        this.e1 = 2;
      }
    },
    nextStep2() {
      if (this.$refs.step2.validate()) {
        this.e1 = 3;
      }
    },
    nextStep3() {
      if (this.$refs.step3.validate()) {
        this.e1 = 4;
      }
    },
    nextStep4() {
      if (this.$refs.step4.validate()) {
        this.e1 = 5;
      }
    },
    beforeWindowUnload(e) {
      console.log("beforeWindowUnload", e);
      if (this.completed) {
        e.preventDefault();
        e.returnValue = "";
      }
    },
  },
};
</script>

<style scoped>
@media (max-width: 390px) {
  .mobile-container {
    display: flex;
    /* flex-wrap: wrap; */
    flex-direction: column;
    justify-content: center;
  }
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  /* width: 0%; */
}
</style>
