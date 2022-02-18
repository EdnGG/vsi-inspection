<template>
  <v-container fluid mt-5 pa-5>
    <!-- <v-row justify-center align-center class="text-center"> -->
      <!-- <v-col cols="12"> -->
        <!--  -->
        <v-form v-model="valid">
          <!-- <v-container> -->
          <v-container>
          <v-row class="d-flex justify-space-around" >
            <v-col cols="12" md="3">
              <v-text-field
                v-model="inspection"
                :rules="inspectionRules"
                :counter="10"
                label="Inspection #"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                v-model="date"
                :rules="inspectionRules"
                :counter="10"
                label="Date"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                v-model="technical"
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
                v-model="actuator"
                :rules="inspectionRules"
                label="Actuator Model"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="controlPack"
                :rules="inspectionRules"
                label="Control Pack Model"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-container fluid>
                <!-- <v-container fluid> -->
                <v-row justify-center align-center class="text-center">
                  <v-col cols="6">
                    <v-subheader>
                      Visual
                    <!-- {{val1}} {{val2}} {{val3}} {{val4}} {{val5}} -->
                    </v-subheader>
                  </v-col>

                  <v-col cols="6">
                    <v-select
                      v-model="select"
                      :hint="`${select.item}`"
                      :items="items"
                      item-text="state"
                      label="Select"
                      persistent-hint
                      return-object
                      single-line
                    ></v-select>
                  </v-col>
                  
                </v-row>
                <v-row align="center">
                  <v-col cols="6">
                    <v-subheader>
                      Water Inspection
                    <!-- {{val1}} {{val2}} {{val3}} {{val4}} {{val5}} -->
                    </v-subheader>
                  </v-col>

                  <v-col cols="6">
                    <v-select
                      v-model="select"
                      :hint="`${select.item}`"
                      :items="items"
                      item-text="state"
                      label="Select"
                      persistent-hint
                      return-object
                      single-line
                    ></v-select>
                  </v-col>
                  
                </v-row>
                <v-row align="center">
                  <v-col cols="6">
                    <v-subheader>
                      Operational Test
                    <!-- {{val1}} {{val2}} {{val3}} {{val4}} {{val5}} -->
                    </v-subheader>
                  </v-col>

                  <v-col cols="6">
                    <v-select
                      v-model="select"
                      :hint="`${select.item}`"
                      :items="items"
                      item-text="state"
                      label="Select"
                      persistent-hint
                      return-object
                      single-line
                    ></v-select>
                  </v-col>
                  
                </v-row>
                <v-row align="center">
                  <v-col cols="6">
                    <v-subheader>
                      Wire Compartment
                    <!-- {{val1}} {{val2}} {{val3}} {{val4}} {{val5}} -->
                    </v-subheader>
                  </v-col>

                  <v-col cols="6">
                    <v-select
                      v-model="select"
                      :hint="`${select.item}`"
                      :items="items"
                      item-text="state"
                      label="Select"
                      persistent-hint
                      return-object
                      single-line
                    ></v-select>
                  </v-col>
                  
                </v-row>
                <v-row align="center">
                  <v-col cols="6">
                    <v-subheader>
                      Handwheel Bolt Patern
                    <!-- {{val1}} {{val2}} {{val3}} {{val4}} {{val5}} -->
                    </v-subheader>
                  </v-col>

                  <v-col cols="6">
                    <v-select
                      v-model="select"
                      :hint="`${select.item}`"
                      :items="items"
                      item-text="state"
                      label="Select"
                      persistent-hint
                      return-object
                      single-line
                    ></v-select>
                  </v-col>
                  
                </v-row>
              <!-- </v-container> -->
                <!-- <custom-field :val1="val1" />
                <custom-field :val2="val2" />
                <custom-field :val3="val3" />
                <custom-field :val4="val4" />
                <custom-field :val5="val5" /> -->
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
                  v-model="observaciones"
                ></v-textarea>
              </v-container>
            </v-col>
          </v-row>
          <!-- <v-spacer></v-spacer> -->
          <v-container>
          <v-row>
            <v-col cols="12" md="6" class="block">
              <v-btn color="warning" :disabled="valid"> Add Actuator </v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn
                color="success"
                type="submit"
                :disabled="valid"
                @click="submit"
              >
                Submit Inspection
              </v-btn>
            </v-col>
          </v-row>
          </v-container>
          </v-container>
        </v-form>
    <!--  -->
      <!-- </v-col> -->
    <!-- </v-row> -->
  </v-container>
</template>

<script>
export default {
  components: {
    // "custom-field": require("@/components/CustomField.vue").default,
  },
  data: () => ({
    firstVal: false,
    select: { state: "Good", item: "Looks good" },
    items: [
      { state: "Good", item: "Looks good" },
      { state: "Bad", item: "Looks Bad" },
      { state: "Not sure", item: "Not sure condition" },
    ],
    // val1: "Visual",
    // val2: "Water Inspection",
    // val3: "Operational Test",
    // val4: "Wire Compartment",
    // val5: "Handwheel Bolt Patern",

    valid: false,
    inspection: "",
    date: "",
    technical: "",
    inspectionRules: [
      (v) => !!v || "Field is required",
      (v) => v.length <= 20 || "Field must be less than 10 characters",
    ],
    actuator: "",
    observaciones: "",
    controlPack: "",
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
