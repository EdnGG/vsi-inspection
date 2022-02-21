<template>
  <v-container fluid mt-5 pa-5>
        <!--  -->
        <v-form  @submit.prevent="addActuator" v-model="valid">
          <v-container v-if="!firstVal">
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
          </v-container>
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
          <v-container v-if="firstVal">
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
                <custom-field :setState="setState" title1="Visual"  @accion="visual"/>
                <custom-field :setState="setState" title2="Water Inspection"  @accion="waterInspection"/>
                <custom-field :setState="setState" title3="Operational Test"  @accion="operationalTest"/>
                <custom-field :setState="setState" title4="Wire Compartiment"  @accion="wireCompartiment"/>
                <custom-field :setState="setState" title5="Handwheel Bolt Patern"  @accion="handwheelBoltPatern"/> 
                <p>{{results}}</p>
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
              <v-btn 
                class="ma-5 col-xs-6" 
                xs="6" color="warning" 
                :disabled="!prevButton"
              > Prev Actuator 
              </v-btn>
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
                :disabled="valid"
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
export default {
  components: {
    "custom-field": require("@/components/CustomField.vue").default,
  },
  data: () => ({
    firstVal: false,
    prevButton: false,
    nextButton: false,
    setState: "",
    results: [],
    valid: false,
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
    // emailRules: [
    //   (v) => !!v || "E-mail is required",
    //   (v) => /.+@.+/.test(v) || "E-mail must be valid",
    // ],
  }),
  computed: {
    hide: function () {
      return {
        display: this.firstVal ? "none" : "block",
        // display: "none",
        // active: this.isActive && !this.error,
        // 'text-danger': this.error && this.error.type === 'fatal'
      };
    },
  },
  methods: {
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
    validate() {
      return this.$refs.form.validate();
    },
    addActuator() {
      console.log("inspection: ", this.results);
      this.results.push(this.inspection);
      this.inspection = {
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
      console.log("Enviando inspeccion a firebase");
      this.$refs.form.validate();
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