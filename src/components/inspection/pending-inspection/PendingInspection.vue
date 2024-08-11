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
                    label="VSI Purchase Order Number"
                    required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-menu
                    ref="menuDate"
                    v-model="menuDate"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="totalInspection.date"
                        label="Date"
                        prepend-icon="mdi-calendar"
                        :rules="inspectionRules"
                        readonly
                        v-bind="attrs"
                        v-on="on"></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="totalInspection.date"
                      no-title
                      scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menuDate = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menuDate.save(date)">
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model.trim="totalInspection.technical"
                    :rules="inspectionRules"
                    label="Inspected by"
                    required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model.trim="totalInspection.orderQuantity"
                    :rules="inspectionRules"
                    :counter="10"
                    label="Order Quantity"
                    required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model.trim="totalInspection.testSampleSize"
                    :rules="inspectionRules"
                    :counter="10"
                    label="Test Sample Size"
                    required></v-text-field>
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
                  <core-custom-select-actuator
                    v-model="tmpData.actuatorModel"
                    title="Actuator Model">
                  </core-custom-select-actuator>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="tmpData.actuatorSerialNumber"
                    label="Actuator Serial Number"
                    :rules="inspectionRules"
                    required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="tmpData.controlPack"
                    label="Control Pack Model"
                    required></v-text-field>
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
            <core-custom-select
              v-model="tmpData.visual"
              title="Visual"
              @input="updateValue('visual', $event)">
              ></core-custom-select
            >
            <core-custom-select
              v-model="tmpData.waterInspection"
              title="Water Inspection"
              @input="updateValue('waterInspection', $event)">
            </core-custom-select>
            <core-custom-select
              v-model="tmpData.operationalTest"
              title="Operational Test"
              @input="updateValue('operationalTest', $event)">
            </core-custom-select>
            <core-custom-select
              v-model="tmpData.wireCompartiment"
              title="Wire Compartiment"
              @input="updateValue('wireCompartiment', $event)">
            </core-custom-select>
            <core-custom-select
              v-model="tmpData.handwheelBoltPatern"
              title="Handwheel Bolt Patern"
              @input="updateValue('handwheelBoltPatern', $event)">
              >
            </core-custom-select>
  
            <div class="d-flex">
              <v-btn color="primary" @click="e1 = 4" class="mr-2">
                Continue
              </v-btn>
              <v-btn text @click="e1 = 2"> Back </v-btn>
            </div>
          </v-stepper-content>
  
          <v-stepper-content step="4">
            <v-row>
              <v-col cols="12">
                <v-container fluid>
                  <core-custom-select-details
                    v-model="tmpData.observaciones" 
                    title="Observations" 
                    :value="tmpData.observaciones"
                    @input="updateObservaciones($event)"
                    >
                    <!-- :defaultValue="'All Good'" -->
                  >
                  </core-custom-select-details>
                 
                </v-container>
              </v-col>
            </v-row>
  
            <div class="d-flex">
              <v-btn color="primary" 
                @click="e1 = 3" 
                class="mr-2"
              > 
                Back 
              </v-btn>
              <v-btn
                class="mr-2"
                color="success"
                @click="addActuator({ step: 2 })">
                Add Actuator
              </v-btn>
              <v-btn
                color="primary"
                @click="addActuator({ step: 5 })"
                class="mr-2"
              >
                Finish Inspection
              </v-btn>
              
              <v-btn 
                color="warning"   
                @click="saveAndContinueLater" 
                class="mr-2"
              >
                Save and continue later
              </v-btn>
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
                    v-model.trim="totalInspection.observaciones"></v-textarea>
                </v-container>
              </v-col>
            </v-row>
            <!--  -->
            <v-dialog
              style="padding-top: 10px"
              v-model="modalSubmit"
              persistent
              max-width="500">
              <v-card>
                <v-card-title class="text-h5">
                  Are you sure sending inspection report?
                </v-card-title>
                <v-card-text>
                  Sending the inspection report will be post on the DB and no change can
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
  import { mapState } from 'vuex';
  import { mapActions } from 'vuex';
  // import { router } from 'vue-router';
  // import pdfGenerator from "@/helpers/pdfGenerator.js";
  import { defineAsyncComponent } from 'vue';
  
  export default {
    name: 'InspectionFormActuators',
    components: {
      CoreCustomSelect: defineAsyncComponent(() =>
        import('@/components/core/CustomSelect.vue'),
      ),
      CoreCustomSelectActuator: defineAsyncComponent(() =>
        import('@/components/core/CustomSelectActuator.vue'),
      ),
      CoreCustomSelectDetails: defineAsyncComponent(() => 
        import('@/components/core/CustomSelectDetails.vue'),
      ),
    },
  
    data: () => ({
      continueInspectionLater: JSON.parse(localStorage.getItem('continueInspectionLater')) || [],
      e1: 1,
      step1: null,
      step2: null,
      modalSubmit: false,
      firstVal: false,
      menuDate: false,
      prevButton: false,
      nextButton: false,
      select: { state: '', item: 'Select one' },
      observacionesIniciales: ['All Good'],
      date: '',
      totalInspection: {
        id: 'PO-123123',
        date: '',
        technical: 'Eden',
        orderQuantity: '1000',
        testSampleSize: '100',
        observaciones: 'All Good',
        data: [],
      },
      tmpData: {
        actuatorModel: '1005-X',
        actuatorSerialNumber: '123123123',
        controlPack: '21312312321',
        visual: 'Good',
        waterInspection: 'Good',
        operationalTest: 'Good',
        wireCompartiment: 'Good',
        handwheelBoltPatern: 'Good',
        observaciones: ['All Good'],
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
    watch: {
      'tmpData.observaciones': function (newVal) {
        if (newVal.length === 0) {
          this.tmpData.observaciones = [...this.observacionesIniciales];
        }
        // console.log('Observaciones actualizadas a:', newVal);
      },
    },
    created() {
      // if(){
      // this.tmpData.observaciones = [...this.observacionesIniciales];
      // }
      // console.log('Observaciones iniciales: ', this.observacionesIniciales);
    },
    methods: {
      ...mapActions('inspection', ['addInspection', 'continueLaterInspection']),
  
      updateValue(field, value) {
        this.tmpData[field] = value.state;
      },
      updateObservaciones(event) {
        console.log(
          'Antes de actualizar el valor observaciones: ',
          this.tmpData.observaciones,
        );
        console.log(
          'Valor que recibe el padre del hijo updateObservaciones(event) : ',
          event,
        );
        this.tmpData.observaciones = [...event];
        console.log(
          'Despues de actualizar el valor observaciones: ',
          this.tmpData.observaciones,
        );
      },
      addActuator({ step }) {
        if (this.tmpData.actuatorModel) {
          this.totalInspection.data.push({ ...this.tmpData });
          this.tmpData = {
            actuatorModel: '',
            actuatorSerialNumber: '',
            controlPack: '',
            visual: 'Good',
            waterInspection: 'Good',
            operationalTest: 'Good',
            wireCompartiment: 'Good',
            handwheelBoltPatern: 'Good',
            observaciones: ['All Good'],
          };
        }
  
        this.$refs.step2.reset();
        this.e1 = step;
      },
      saveAndContinueLater() {
        // save the inspections and continue later
        console.log('saveAndContinueLater');
        this.addActuator({ step: 4 })
        
        this.continueInspectionLater.push(this.totalInspection)
        
        localStorage.setItem('continueInspectionLater', JSON.stringify(this.continueInspectionLater))
  
        this.$router.push({name :'details'})
        console.log('continue Inspection Later: ', this.continueInspectionLater);
  
      },
      submit() {
        try {
          this.addInspection(this.totalInspection);
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
  }
  </style>
  