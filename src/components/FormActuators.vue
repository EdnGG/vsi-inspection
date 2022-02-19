<template>
  <v-container fluid mt-5 pa-5>
        <!--  -->
        <v-form v-model="valid">
          <v-container>
          <v-row class="d-flex justify-space-around" >
            <v-col cols="12" md="3">
              <v-text-field
                v-model="inspection.inspection"
                :rules="inspectionRules"
                :counter="10"
                label="Inspection #"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="inspection.date"
                :rules="inspectionRules"
                :counter="10"
                label="Date"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="inspection.technical"
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
                v-model="inspection.actuator"
                :rules="inspectionRules"
                label="Actuator Model"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="inspection.controlPack"
                :rules="inspectionRules"
                label="Control Pack Model"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-container fluid>
                <!-- By components -->
                <!-- <custom-field :val1="val1" :items="items" :select="select"/>
                <custom-field :val2="val2" :items="items" :select="select"/>
                <custom-field :val3="val3" :items="items" :select="select"/>
                <custom-field :val4="val4" :items="items" :select="select"/>
                <custom-field :val5="val5" :items="items" :select="select"/>  -->
                <custom-field :title1="title1" />
                <custom-field :title2="title2" />
                <custom-field :title3="title3" />
                <custom-field :title4="title4" />
                <custom-field :title5="title5" /> 
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
                  v-model="inspection.observaciones"
                ></v-textarea>
              </v-container>
            </v-col>
          </v-row>
          <v-container class="button-container">
          <v-row align-center justify-space-around>
            <v-col  class="button-container" cols="12" xs="6" text-xs-center>
              <v-btn class="ma-5 col-xs-6" xs="6" color="warning" :disabled="!prevButton"> Prev Actuator </v-btn>
              <v-btn class="ma-5 col-xs-6" xs="6" color="warning" :disabled="nextButton"> Next Actuator </v-btn>
            </v-col>
             <!-- <v-col cols="12" md="6"> -->
              <!-- <v-btn color="warning" :disabled="valid"> Next Actuator </v-btn> -->
            <!-- </v-col> -->
            <!-- <v-col cols="12" md="6">
              <v-btn
                color="success"
                type="submit"
                :disabled="valid"
                @click="submit"
              >
                Submit Inspection
              </v-btn>
            </v-col> -->
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
    firstVal: !false,
    prevButon: false,
    nextButton: false,
    // select: { state: "God", item: "Looks good" },
    // items: [
    //   { state: "Good", item: "Looks good" },
    //   { state: "Bad", item: "Looks Bad" },
    //   { state: "Not sure", item: "Not sure condition" },
    // ],
    title1: "Visual",
    title2: "Water Inspection",
    title3: "Operational Test",
    title4: "Wire Compartment",
    title5: "Handwheel Bolt Patern",
    valid: false,
    inspection: {
      inspection: "",
      date: "",
      technical: "",
      actuator: "",
      observaciones: "",
      controlPack: "",
    },
    inspectionRules: [
      (v) => !!v || "Field is required",
      (v) => v.length <= 20 || "Field must be less than 10 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
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
    validateFirstSection() {
      if (this.inspection && this.date && this.technical) {
        return (this.firstVal = true);
        // display: this.firstVal ? "none" : "block",
      }
      return (this.firstVal = false);
    },
    validate() {
      return this.$refs.form.validate();
    },
    submit() {
      console.log("clicked");
      this.$refs.form.validate();
      // return this.$refs.form.validate()
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