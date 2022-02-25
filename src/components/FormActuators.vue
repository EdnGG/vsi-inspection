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
          <!-- <v-container>
           
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
                <!-- checar setState -->
                <!-- <custom-field :selectCustom="select" :itemsCustom="items" title1="Visual"  @accion="visual"/>
                <custom-field :selectCustom="select" :itemsCustom="items" title2="Water Inspection"  @accion="waterInspection"/>
                <custom-field :selectCustom="select" :itemsCustom="items" title3="Operational Test"  @accion="operationalTest"/>
                <custom-field :selectCustom="select" :itemsCustom="items" title4="Wire Compartiment"  @accion="wireCompartiment"/>
                <custom-field :selectCustom="select" :itemsCustom="items" title5="Handwheel Bolt Patern"  @accion="handwheelBoltPatern"/>  -->
                <!--  -->
                <custom-field title1="Visual"  @accion="visual"/>
                <custom-field title2="Water Inspection"  @accion="waterInspection"/>
                <custom-field title3="Operational Test"  @accion="operationalTest"/>
                <custom-field title4="Wire Compartiment"  @accion="wireCompartiment"/>
                <custom-field title5="Handwheel Bolt Patern"  @accion="handwheelBoltPatern"/> 
                <p>Array con todos los objetos: {{totalInspection}}</p>
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
    // Checar aqui
    // select: { state: "", item: "Select one" },
    // items: [
    //   { state: "Good", item: "Looks good" },
    //   { state: "Bad", item: "Looks Bad" },
    //   { state: "Not sure", item: "Not sure condition" },
    // ],
    // setState: { state: "", item: "Select one" },
    totalInspection: [],
    // initial object
    inspection: {
      inspection: {
        number: "",
        date: "",
        technical: "",
      },
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
      (v) => v.length <= 20 || "Field must be less than 10 characters",
    ],
  }),
  computed: {
    ...mapState(["inspections", "allInspections"]),
    hide() {
      return {
        display: this.firstVal ? "none" : "block",
      };
    },
  },
  methods: {
    ...mapActions(["addInspection", "addActuator"]),
    visual(value) {
      this.inspection.visual = value;
    },
    waterInspection(value) {
      this.inspection.waterInspection = value;
    },
    operationalTest(value) {
      this.inspection.operationalTest = value;
    },
    wireCompartiment(value) {
      this.inspection.wireCompartiment = value;
    },
    handwheelBoltPatern(value) {
      this.inspection.handwheelBoltPatern = value;
    },
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
      //  info a vuex
      this.totalInspection.push(this.inspection);
      this.$store.dispatch("addActuator", this.inspection);
      console.log("all inspections: ", this.totalInspection);
      // this.$refs.form.resetValidation();
      // this.select.item = "Select one";
      // this.setState = { state: "", item: "Select one" };
      this.inspection = {
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
        actuator: "",
        controlPack: "",
        observaciones: "",
        visual: "",
        waterInspection: "",
        operationalTest: "",
        wireCompartiment: "",
        handwheelBoltPatern: "",
      };
      // (this.setState = this.setState = { state: "", item: "Select one" }),
    },
    submit() {
      /* 
        Aqui se envia ya todo el formulario a firebase 
        a travez de una accion de vuex
      */
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