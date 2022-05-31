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
        <!-- <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 5" step="5"> </v-stepper-step> -->
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-row justify="space-between" class="mb-4">
            <v-col cols="12" md="3">
              <v-text-field
                v-model.trim="inspection.id"
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
                    v-model="inspection.date"
                    label="Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="inspection.date" no-title scrollable>
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
                v-model.trim="inspection.technical"
                :rules="inspectionRules"
                label="Technical Name"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="d-flex">
            <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-row justify="space-between" class="mb-4">
            <v-col cols="12" md="3">
              <v-text-field
                v-model="inspection.data.actuator"
                label="Actuator Model"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="inspection.data.controlPack"
                label="Control Pack Model"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <div class="d-flex">
            <v-btn color="primary" @click="e1 = 3" class="mr-2">
              Continue
            </v-btn>
            <v-btn text @click="e1 = 1"> Back </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-row>
            <v-col cols="12">
              <v-container fluid>
                <core-custom-select
                  v-model="inspection.data.visual"
                  title="Visual"
                ></core-custom-select>
                <core-custom-select
                  v-model="inspection.data.waterInspection"
                  title="Water Inspection"
                ></core-custom-select>
                <core-custom-select
                  v-model="inspection.data.operationalTest"
                  title="Operational Test"
                ></core-custom-select>
                <core-custom-select
                  v-model="inspection.data.wireCompartiment"
                  title="Wire Compartiment"
                ></core-custom-select>
                <core-custom-select
                  v-model="inspection.data.handwheelBoltPatern"
                  title="Handwheel Bolt Patern"
                ></core-custom-select>
                <p>Array con todos los objetos: {{ totalInspection }}</p>
                <p>Objeto actuator : {{ inspection }}</p>
              </v-container>
            </v-col>
          </v-row>
          <div class="d-flex">
            <v-btn color="primary" @click="e1 = 4" class="mr-2">
              Continue
            </v-btn>
            <v-btn text @click="e1 = 2"> Back </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card class="mb-12" height="500px">
            <v-row>
              <v-col cols="12">
                <v-container fluid>
                  <v-textarea
                    clearable
                    clear-icon="mdi-close-circle"
                    label="Notes:"
                    v-model.trim="inspection.data.observaciones"
                  ></v-textarea>
                </v-container>
              </v-col>
            </v-row>
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
                        Sending the inspection will be post on the DB and no
                        change can be done.
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="green darken-1"
                          text
                          @click="dialog = false"
                        >
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
          </v-card>
          <v-btn text @click="e1 = 3"> Back </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import CoreCustomSelect from '@/components/core/CustomSelect.vue';
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
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
    select: { state: '', item: 'Select one' },
    tmpTotalInspection: [],
    date: '',
    totalInspection: {
      id: '',
      date: '',
      technical: '',
      data: []
    },
    // ESTE SERIA EL OBJETO QUE SE VA A ENVIAR A FIRESTORE
    inspection: {
      id: '',
      date: '',
      technical: '',
      data: {
        actuator: '',
        controlPack: '',
        visual: '',
        waterInspection: '',
        operationalTest: '',
        wireCompartiment: '',
        handwheelBoltPatern: '',
        observaciones: '',
      },
    },
    inspectionRules: [(v) => !!v || 'Field is required'],
  }),
  computed: {
    ...mapState(['inspections', 'allInspections']),
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
        display: this.firstVal ? 'none' : 'block',
      };
    },
  },
  methods: {
    ...mapActions(['addInspection', 'addActuator']),
    validateFirstSection() {
      if (
        this.inspection.id &&
        this.inspection.date &&
        this.inspection.technical
      ) {
        return (this.firstVal = true);
      }
      return (this.firstVal = false);
    },
    addActuator() {
      this.tmpTotalInspection.push(this.inspection);
      this.totalInspection = {
        id: this.inspection.id,
        date: this.inspection.date,
        technical: this.inspection.technical,
      }

      this.totalInspection.data = this.tmpTotalInspection.map((item) => ({
          actuator: item.data.actuator,
          controlPack: item.data.controlPack,
          visual: item.data.visual,
          waterInspection: item.data.waterInspection,
          operationalTest: item.data.operationalTest,
          wireCompartiment: item.data.wireCompartiment,
          handwheelBoltPatern: item.data.handwheelBoltPatern,
          observaciones: item.data.observaciones,
        }));

      this.$store.dispatch('addActuator', this.inspection);
      console.log('all inspections: ', this.totalInspection);

      this.inspection = {
        id: this.inspection.id,
        date: this.inspection.date,
        technical: this.inspection.technical,
        data: {
          actuator: '',
          controlPack: '',
          visual: '',
          waterInspection: '',
          operationalTest: '',
          wireCompartiment: '',
          handwheelBoltPatern: '',
          observaciones: '',
        },
      };
      this.e1 = 2;
    },
    submit() {
      // for( let i = 0; i)
      // for (let i in this.inspection.data) {
      console.log('function submmit executed');
      // if (this.inspection.inspectionInfo.data[i].value === "") {
      // this.inspection.inspectionInfo.data[i] = "N/A";
      // implementar el SNACKBAR COMPONENT
      // alert("Please fill all fields");
      // } else {

      this.$store.dispatch('addInspection', this.totalInspection);
      console.log('Enviando inspeccion a firebase');

      this.inspection = {
        id: '',
        date: '',
        techinical: '',
      };
      this.$refs.form.reset();
      // }
      // }

      // checar si dentro del objeto data esta vacio
      console.log(this.inspection.data);
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
