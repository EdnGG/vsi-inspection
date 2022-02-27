<template>
  <v-container fluid mt-5 pa-5>
        <!--  -->
        <v-form  @submit.prevent="addActuator" ref="form">
          <v-container v-if="!firstVal">
          <!-- <v-container> -->
          <v-row class="d-flex justify-space-around" >
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="inspection.inspection.number"
                :rules="inspectionRules"
                :counter="10"
                label="Inspection #"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="inspection.inspection.date"
                :rules="inspectionRules"
                :counter="10"
                label="Date"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="inspection.inspection.technical"
                :rules="inspectionRules"
                label="Technical Name"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-col>
            <v-row>
              <v-container>
            <v-row>
              <v-col>
                <v-btn 
                  @click="validateFirstSection"
                  block
                  elevation="2"
                >
                  Next
                </v-btn> 
              </v-col>
            </v-row>
          </v-container>
            </v-row>
          </v-col>
          </v-container>
          <!-- Button -->
          <v-container v-if="firstVal">
          <!-- <v-container> -->
          <v-row class="d-flex justify-space-around">
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="inspection.actuator"
                :rules="inspectionRules"
                label="Actuator Model"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="inspection.controlPack"
                :rules="inspectionRules"
                label="Control Pack Model"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-container fluid>               
                <!--  -->
                <custom-field v-model="inspection.visual" title="Visual"/>
                <custom-field v-model="inspection.waterInspection" title="Water Inspection"/>
                <custom-field v-model="inspection.operationalTest" title="Operational Test"/>
                <custom-field v-model="inspection.wireCompartiment" title="Wire Compartiment"/>
                <custom-field v-model="inspection.handwheelBoltPatern" title="Handwheel Bolt Patern"/> 
                <!--  -->
                <p>Array con todos los objetos: {{totalInspection}}</p>
                <p>Array : {{inspection}}</p>
              </v-container>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-container fluid>
                <v-textarea
                  clearable
                  clear-icon="mdi-close-circle"
                  label="Notes:"
                  v-model.trim="inspection.observaciones"
                ></v-textarea>
              </v-container>
            </v-col>
          </v-row>
          Datos array:  {{ datosArray}}
          <v-container class="button-container">
          <v-row align-center justify-space-around>
            <v-col  class="button-container" cols="12" xs="6" text-xs-center>
              <!-- <v-btn 
                class="ma-5 col-xs-6" 
                xs="6" color="warning" 
                :disabled="!prevButton"
              > Prev Actuator 
              </v-btn> -->
              <v-btn 
                class="ma-5 col-xs-6" 
                xs="6" color="warning" 
                :disabled="nextButton"
                @click="addActuator"
              > Next Actuator </v-btn>
            </v-col>
          </v-row>
          </v-container>
          <v-col cols="12">
              <v-btn
                color="success"
                type="submit"
                block
                @click="submit"
              >
                Submit Inspection
              </v-btn>
            </v-col>
          <v-container>
          </v-container>
          </v-container>
        </v-form>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
export default {
  components: {
    "custom-field": require("@/components/CustomField.vue").default,
  },
  data: () => ({
    firstVal: false,
    prevButton: false,
    nextButton: false,
    // value1: "",
    // value2: "",
    // value3: "",
    // value4: "",
    // value5: "",
    // Checar aqui
    select: { state: "", item: "Select one" },
    totalInspection: [],
    // initial object
    inspection: {
      inspection: {
        number: "",
        date: "",
        technical: "",
      },
      // value1: "",
      // value2: "",
      // value3: "",
      // value4: "",
      // value5: "",
      actuator: "",
      observaciones: "",
      controlPack: "",
      visual: "",
      waterInspection: "",
      operationalTest: "",
      wireCompartiment: "",
      handwheelBoltPatern: "",
    },
    inspectionRules: [
      (v) => !!v || "Field is required",
      // length
      // (v) => v.length <= 10 || "Field must be less than 10 characters",
    ],
  }),
  computed: {
    ...mapState(["inspections", "allInspections"]),
    datosArray() {
      return [
        this.inspection.visual.state,
        this.inspection.waterInspection.state,
        this.inspection.operationalTest.state,
        this.inspection.wireCompartiment.state,
        this.inspection.handwheelBoltPatern.state,
      ].filter((item) => {
        if (item) return item;
      });
    },
    hide() {
      return {
        display: this.firstVal ? "none" : "block",
      };
    },
  },
  methods: {
    ...mapActions(["addInspection", "addActuator"]),
    validateFirstSection() {
      if (
        this.inspection.inspection.number &&
        this.inspection.inspection.date &&
        this.inspection.inspection.technical
      ) {
        return (this.firstVal = true);
        // display: this.firstVal ? "none" : "block",
      }
      return (this.firstVal = false);
    },
    addActuator() {
      this.totalInspection.push(this.inspection);
      this.$store.dispatch("addActuator", this.inspection);
      console.log("all inspections: ", this.totalInspection);
      // this.$refs.form.reset();
      // this.inspection = {
      // inspection: {
      //   number = this.totalInspection.inspection.inspection.number,
      //   date =  this.totalInspection.inspection.inspection.number,
      //   technical = this.totalInspection.inspection.inspection.number,
      // },
      // inspection: {
      //   number: "",
      //   date: "",
      //   technical: "",
      // },
      // actuator: "",
      // controlPack: "",
      // observaciones: "",
      // visual: "",
      // waterInspection: "",
      // operationalTest: "",
      // wireCompartiment: "",
      // handwheelBoltPatern: "",
      // };
    },
    submit() {
      this.$store.dispatch("addInspection", this.totalInspection);
      console.log("Enviando inspeccion a firebase");
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: space-around;
  width: 70%;
}
</style>