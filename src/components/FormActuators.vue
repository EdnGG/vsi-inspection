<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
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
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="actuator"
            :rules="inspectionRules"
            label="Actuator Model"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="9">
          <custom-field :val1="val1" />
          <custom-field :val2="val2" />
          <custom-field :val3="val3" />
          <custom-field :val4="val4" />
          <custom-field :val5="val5" />
        </v-col>
      </v-row>
      <!-- <v-spacer></v-spacer> -->
      <v-row>
        <v-col cols="12" md="6">
          <v-btn color="warning" :disabled="valid"> Next </v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <v-btn
            color="success"
            type="submit"
            :disabled="valid"
            @click="submit"
          >
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  components: {
    "custom-field": require("@/components/CustomField.vue").default,
  },
  data: () => ({
    val1: "Visual",
    val2: "Water Inspection",
    val3: "Operational Test",
    val4: "Wire Compartment",
    val5: "Handwheel Bolt Patern",

    valid: false,
    inspection: "",
    date: "",
    inspectionRules: [
      (v) => !!v || "Field is required",
      (v) => v.length <= 10 || "Field must be less than 10 characters",
    ],
    technical: "",
    actuator: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
  }),
  methods: {
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