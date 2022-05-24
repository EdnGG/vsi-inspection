<template>
<v-container>
<v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">
            Step 1
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2">
            Step 2
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3"> Step 3 </v-stepper-step>
        </v-stepper-header>
  <v-form @submit.prevent="addActuator" ref="form">
    <v-container>
      <!-- <v-container v-show="!firstVal"> -->
      
 <v-stepper-items>
      <v-stepper-content step="1">
       <!-- First content -->
        <v-row class="d-flex justify-space-around">
        <v-col cols="12" md="3">
          <v-text-field
            v-model.trim="inspection.inspectionInfo.id"
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
                v-model="inspection.inspectionInfo.date"
                label="Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="inspection.inspectionInfo.date"
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menuDate = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.menuDate.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model.trim="inspection.inspectionInfo.technical"
            :rules="inspectionRules"
            label="Technical Name"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
<!-- Finish first content -->
        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <!-- Second content -->
         <v-container>
      <v-row class="d-flex justify-space-around">
        <v-col cols="12" md="3">
          <v-text-field
            v-model="inspection.inspectionInfo.data.actuator"
            label="Actuator Model"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="inspection.inspectionInfo.data.controlPack"
            label="Control Pack Model"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-container fluid>
            <core-custom-select
              v-model="inspection.inspectionInfo.data.visual"
              title="Visual"
            ></core-custom-select>
            <core-custom-select
              v-model="inspection.inspectionInfo.data.waterInspection"
              title="Water Inspection"
            ></core-custom-select>
            <core-custom-select
              v-model="inspection.inspectionInfo.data.operationalTest"
              title="Operational Test"
            ></core-custom-select>
            <core-custom-select
              v-model="inspection.inspectionInfo.data.wireCompartiment"
              title="Wire Compartiment"
            ></core-custom-select>
            <core-custom-select
              v-model="inspection.inspectionInfo.data.handwheelBoltPatern"
              title="Handwheel Bolt Patern"
            ></core-custom-select>
            <p>Array con todos los objetos: {{ totalInspection }}</p>
            <p>Objeto actuator : {{ inspection }}</p>
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
              v-model.trim="inspection.inspectionInfo.data.observaciones"
            ></v-textarea>
          </v-container>
        </v-col>
      </v-row>
      Datos array: {{ datosArray }}
      <v-container class="button-container mobile-container">
        <v-row align-center justify-center>
          <v-col class="" cols="12" xs="6" text-xs-center>
            <v-btn
              class="ma-5 col-xs-6"
              xs="6"
              color="warning"
              :disabled="nextButton"
              @click="addActuator"
            >
              Add Actuator
            </v-btn>
            <v-dialog
              style="padding-top: 10px"
              v-model="dialog"
              persistent
              max-width="500"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  class="ma-5 col-xs-6"
                  xs="6"
                >
                  End inspection
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h5">
                  Are you sure sending inspection?
                </v-card-title>
                <v-card-text>
                  Sending the inspection will be post on the DB and no change
                  can be done.
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false">
                    Cancel
                  </v-btn>
                  <v-btn color="green darken-1" text @click="submit">
                    Submit Inspection
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
        <!-- Finished second content -->

        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        >
        Finish Inspection</v-card>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Continue
        </v-btn>

        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
</v-form>
  </v-stepper>


</v-container>
<!--  -->
      

      <!--  -->
      <!-- <v-row class="d-flex justify-space-around">
        <v-col cols="12" md="3">
          <v-text-field
            v-model.trim="inspection.inspectionInfo.id"
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
                v-model="inspection.inspectionInfo.date"
                label="Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="inspection.inspectionInfo.date"
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menuDate = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.menuDate.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model.trim="inspection.inspectionInfo.technical"
            :rules="inspectionRules"
            label="Technical Name"
            required
          ></v-text-field>
        </v-col>
      </v-row> -->
      <!-- <v-col>
        <v-row>
          <v-container>
            <v-row>
              <v-col>
                <v-btn @click="validateFirstSection" block elevation="2">
                  Next
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-row>
      </v-col> -->
    <!-- </v-container> -->
    <!-- Button -->
    <!-- <v-container v-show="firstVal"> -->
    <!-- <v-container>
      <v-row class="d-flex justify-space-around">
        <v-col cols="12" md="3">
          <v-text-field
            v-model="inspection.inspectionInfo.data.actuator"
            label="Actuator Model"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="inspection.inspectionInfo.data.controlPack"
            label="Control Pack Model"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-container fluid>
            <core-custom-select
              v-model="inspection.inspectionInfo.data.visual"
              title="Visual"
            ></core-custom-select>
            <core-custom-select
              v-model="inspection.inspectionInfo.data.waterInspection"
              title="Water Inspection"
            ></core-custom-select>
            <core-custom-select
              v-model="inspection.inspectionInfo.data.operationalTest"
              title="Operational Test"
            ></core-custom-select>
            <core-custom-select
              v-model="inspection.inspectionInfo.data.wireCompartiment"
              title="Wire Compartiment"
            ></core-custom-select>
            <core-custom-select
              v-model="inspection.inspectionInfo.data.handwheelBoltPatern"
              title="Handwheel Bolt Patern"
            ></core-custom-select>
            <p>Array con todos los objetos: {{ totalInspection }}</p>
            <p>Objeto actuator : {{ inspection }}</p>
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
              v-model.trim="inspection.inspectionInfo.data.observaciones"
            ></v-textarea>
          </v-container>
        </v-col>
      </v-row>
      Datos array: {{ datosArray }}
      <v-container class="button-container mobile-container">
        <v-row align-center justify-center>
          <v-col class="" cols="12" xs="6" text-xs-center>
            <v-btn
              class="ma-5 col-xs-6"
              xs="6"
              color="warning"
              :disabled="nextButton"
              @click="addActuator"
            >
              Add Actuator
            </v-btn>
            <v-dialog
              style="padding-top: 10px"
              v-model="dialog"
              persistent
              max-width="500"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  class="ma-5 col-xs-6"
                  xs="6"
                >
                  End inspection
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h5">
                  Are you sure sending inspection?
                </v-card-title>
                <v-card-text>
                  Sending the inspection will be post on the DB and no change
                  can be done.
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false">
                    Cancel
                  </v-btn>
                  <v-btn color="green darken-1" text @click="submit">
                    Submit Inspection
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-container>
    </v-container> -->
  <!-- </v-form>
  </v-stepper> -->
</template>

<script>
import CoreCustomSelect from "@/components/core/CustomSelect.vue";
import { mapState } from "vuex";
import { mapActions } from "vuex";
export default {
  components: {
    CoreCustomSelect,
  },
  data: () => ({
    e1: 1,
    dialog: false,
    firstVal: false,
    menuDate: false,
    prevButton: false,
    nextButton: false,
    select: { state: "", item: "Select one" },
    totalInspection: [],
    // initial object
    // ESTE SERIA EL MODELO DE DATOS
    inspection: {
      inspectionInfo: {
        id: "",
        date: "",
        technical: "",
        data: {
          actuator: "",
          controlPack: "",
          visual: "",
          waterInspection: "",
          operationalTest: "",
          wireCompartiment: "",
          handwheelBoltPatern: "",
          observaciones: "",
        },
      },
    },
    inspectionRules: [(v) => !!v || "Field is required"],
  }),
  computed: {
    ...mapState(["inspections", "allInspections"]),
    datosArray() {
      return [
        this.inspection.inspectionInfo.data.visual,
        this.inspection.inspectionInfo.data.waterInspection,
        this.inspection.inspectionInfo.data.operationalTest,
        this.inspection.inspectionInfo.data.wireCompartiment,
        this.inspection.inspectionInfo.data.handwheelBoltPatern,
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
    ...mapActions(["addInspection", "addActuator"]),
    validateFirstSection() {
      if (
        this.inspection.inspectionInfo.id &&
        this.inspection.inspectionInfo.date &&
        this.inspection.inspectionInfo.technical
      ) {
        return (this.firstVal = true);
      }
      return (this.firstVal = false);
    },
    addActuator() {
      this.totalInspection.push(this.inspection);
      this.$store.dispatch("addActuator", this.inspection);
      console.log("all inspections: ", this.totalInspection);

      // ESTE SERIA EL MODELO DE DATOS
      this.inspection = {
        // OBJETO QUE SE MANDARA A FIRESTORE
        inspectionInfo: {
          // OBJETO QUE SE GENERA POR CADA MOTOR
          id: this.inspection.inspectionInfo.id, // valor por default
          date: this.inspection.inspectionInfo.date, // valor por default
          technical: this.inspection.inspectionInfo.technical, // valor por default
          data: {
            actuator: "", // valor a variar
            controlPack: "", // valor a variar
            visual: "", // valor a variar
            waterInspection: "", // valor a variar
            operationalTest: "", // valor a variar
            wireCompartiment: "", // valor a variar
            handwheelBoltPatern: "", // valor a variar
            observaciones: "", // valor a variar
          },
        },
      };
    },
    submit() {
      // for( let i = 0; i)
      // for (let i in this.inspection.inspectionInfo.data) {
      console.log("function submmit executed");
      // if (this.inspection.inspectionInfo.data[i].value === "") {
      // this.inspection.inspectionInfo.data[i] = "N/A";
      // implementar el SNACKBAR COMPONENT
      // alert("Please fill all fields");
      // } else {

      this.$store.dispatch("addInspection", this.totalInspection);
      console.log("Enviando inspeccion a firebase");

      this.inspection = {
        inspectionInfo: {
          id: "",
          date: "",
          techinical: "",
        },
      };
      this.$refs.form.reset();
      // }
      // }

      // checar si dentro del objeto data esta vacio
      console.log(this.inspection.inspectionInfo.data);
      this.dialog = false;
      // if (this.inspection.inspectionInfo.data) {
      //   return alert("fields can't be empty");
      // } else {
      //

      // this.dialog = false;
      // this.$store.dispatch("addInspection", this.totalInspection);
      // console.log("Enviando inspeccion a firebase");
      // this.inspection = {
      //   inspectionInfo: {
      //     id: "",
      //     date: "",
      //     techinical: "",
      //   },
      // };
      // this.$refs.form.reset();
      // this.firstVal = false;

      //
      // }
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
