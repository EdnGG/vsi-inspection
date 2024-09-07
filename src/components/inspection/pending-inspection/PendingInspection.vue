<template>
    <v-container>
     
      <v-stepper v-model="e1">
        <v-stepper-header>
          
          <v-stepper-step :complete="e1 > 2" step="2"> </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 3" step="3"> </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 4" step="4"> </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 5" step="5"> </v-stepper-step>
        </v-stepper-header> 
  
        <v-stepper-items>
      
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
                @click="finishInspection({ step: 5 })"
                class="mr-2"
              >
                Finish Inspection
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
                    v-model.trim="getPendingInspection.observaciones"></v-textarea>
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
      getPendingInspection:[], 
      e1: 2,
      step1: null,
      step2: null,
      modalSubmit: false,
      firstVal: false, 
      observacionesIniciales: ['All Good'],
      lastActuatorSerialNumber: '',
      lastControlPack: '',
      totalInspection: {
        id: '',
        date: '',
        technical: '',
        orderQuantity: '',
        testSampleSize: '',
        observaciones: '',
        data: [],
      },
      tmpData: {
        actuatorModel: '',
        actuatorSerialNumber: '',
        controlPack: '',
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
    },
    watch: {
      'tmpData.observaciones': function (newVal) {
        if (newVal.length === 0) {
          this.tmpData.observaciones = [...this.observacionesIniciales];
        }
      },
    },
    created() {
      this.getPendingInspectionFronQuery()
    },
    methods: {
      ...mapActions('inspection', ['addInspection', 'continueLaterInspection']),
  
      updateValue(field, value) {
        this.tmpData[field] = value.state;
      },
      updateObservaciones(event) {
        this.tmpData.observaciones = [...event];
      },

      addActuator({ step }) {
        if (this.getPendingInspection.data) {
          this.getPendingInspection.data.push({ ...this.tmpData });

          this.lastActuatorSerialNumber = this.tmpData.actuatorSerialNumber
          this.lastControlPack = this.tmpData.controlPack

          this.tmpData = {
            actuatorModel: '',
            actuatorSerialNumber: this.lastActuatorSerialNumber,
            controlPack: this.lastControlPack,
            visual: 'Good',
            waterInspection: 'Good',
            operationalTest: 'Good',
            wireCompartiment: 'Good',
            handwheelBoltPatern: 'Good',
            observaciones: ['All Good'],
          };
        }
      // Reset manual del formulario, excepto para los campos actuatorSerialNumber y controlPack
      this.$nextTick(() => {
        this.$refs.step2.resetValidation();  // Reiniciar validación sin afectar datos
      });
        this.e1 = step;
      },


      finishInspection({ step }) {
      // Agregar el último actuator al array de data
      this.addActuator({ step: 4 })
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
        // console.log('tmpData despues de reiniciar: ', this.tmpData)
      }
    
    this.$refs.step2.reset();
    this.e1 = step;
    },
      getPendingInspectionFronQuery() {
        this.getPendingInspection = this.$route.query.item;
        // console.log('Pending Inspection from query', this.getPendingInspection);
      },
      submit() {
        try {
          this.addInspection(this.getPendingInspection);
          this.modalSubmit = false;
          localStorage.removeItem('continueInspectionLater');
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
  