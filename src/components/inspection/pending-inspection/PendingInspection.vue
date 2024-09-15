<template>
  <v-container>
    <h3>
      <!-- GET PENDING INSPECTION / LOCAL S: {{ getPendingInspection.data }} --> -->
      <!-- {{ getPendingInspection.length }} -->
    </h3>
    <h3>
      <!-- TOTAL INSPECTION DATA: {{ totalInspection.data }} TOTAL INSPECTION: -->
      <!-- TOTAL INSPECTION: {{ totalInspection }} -->
    </h3>
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
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="tmpData.controlPack"
                  label="Control Pack Model"
                  required
                  @input="tmpData.controlPack = tmpData.controlPack.toUpperCase()"
                ></v-text-field>
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
                  @input="updateObservaciones($event)">
                  >
                </core-custom-select-details>
              </v-container>
            </v-col>
          </v-row>

          <div class="d-flex">
            <v-btn color="primary" @click="e1 = 3" class="mr-2"> Back </v-btn>
            <v-btn
              class="mr-2"
              color="success"
              @click="addActuator({ step: 2 })">
              Add Actuator
            </v-btn>
            <v-btn
              color="primary"
              @click="finishInspection({ step: 5 })"
              class="mr-2">
              Finish Inspection
            </v-btn>

            <v-btn color="warning" @click="saveAndContinueLater" class="mr-2">
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
                  v-model.trim="
                  getPendingInspection.observaciones"
                  @input="getPendingInspection.observaciones = getPendingInspection.observaciones.toUpperCase()"
                  >
                </v-textarea>
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
                Sending the inspection report will be post on the DB and no
                change can be done.
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
  name: 'PendingInspection',
  directives: {
    uppercase: {
      update(el) {
        el.value = el.value.toUpperCase();
      },
    },
  },
  
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
    continueInspectionLater:
      JSON.parse(localStorage.getItem('continueInspectionLater')) || [],
    getPendingInspection: [],
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
      observaciones:
        'Actuators were inspected using signals 2-10, 4-20 and their worked as expected',
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
  
  created() {
    this.getPendingInspectionFronQuery();
  },
  

  methods: {
    ...mapActions('inspection', ['addInspection', 'continueLaterInspection']),

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

    updateValue(field, value) {
      this.tmpData[field] = value.state;
    },

    updateObservaciones(event) {
      this.tmpData.observaciones = [...event];
    },

    addActuator({ step }) {
      if (this.tmpData.actuatorModel) {
        this.totalInspection.data.push({ ...this.tmpData });

        // Obtener el array existente de inspecciones pendientes o inicializarlo
        let continueInspectionLater =
          JSON.parse(localStorage.getItem('continueInspectionLater')) || [];

        // Si ya existe una inspección con el mismo ID, la reemplazamos
        const index = continueInspectionLater.findIndex(
          (inspection) => inspection.id === this.totalInspection.id,
        );
        if (index !== -1) {
          continueInspectionLater[index] = { ...this.totalInspection };
        } else {
          continueInspectionLater.push({ ...this.totalInspection });
        }

        // Guardar el array actualizado en localStorage
        localStorage.setItem(
          'continueInspectionLater',
          JSON.stringify(continueInspectionLater),
        );

        // Mantener los valores de actuatorSerialNumber y controlPack
        this.lastActuatorSerialNumber = this.tmpData.actuatorSerialNumber;
        this.lastControlPack = this.tmpData.controlPack;

        // Reiniciar tmpData, manteniendo los valores necesarios
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

        // Avanzar al siguiente paso
        this.e1 = step;

        // Resetear validación del formulario
        this.$nextTick(() => {
          this.$refs.step2.resetValidation();
        });
      } else {
        console.error(
          'No se pudo agregar el actuador. Datos incompletos en tmpData.',
        );
      }
    },

    getPendingInspectionFronQuery() {
      // PENDIENTE RESOLEVER EL EVITAR [Object, Object] CUANDO SE REFRESCA LA PAGINA
      this.getPendingInspection = this.$route.query.item;
      console.log(
        'created: saving inspection from query: ',
        this.getPendingInspection,
      );
      this.totalInspection = this.getPendingInspection;
      console.log('created: totalInspection: ', this.totalInspection);
    },

    saveAndContinueLater() {
      this.addActuator({ step: 4 });
      this.$router.push({ name: 'details' });
    },

    finishInspection({ step }) {
      // Agregar el último actuator al array de data
      this.addActuator({ step: 4 });
      if (this.tmpData.actuatorModel) {
        this.totalInspection.data.push({ ...this.tmpData });
      }
      this.$refs.step2.reset();
      this.e1 = step;
    },

    submit() {
      try {
        this.addInspection(this.totalInspection);
        // Eliminar los datos de localStorage al finalizar
        localStorage.removeItem('continueInspectionLater');
        // Resetear totalInspection
        this.totalInspection = {
          id: '',
          date: '',
          technical: '',
          orderQuantity: '',
          testSampleSize: '',
          observaciones: '',
          data: [],
        };
        // Redirigir o mostrar mensaje de éxito
        this.$router.push({ name: 'details' });
      } catch (err) {
        console.log(`Error: ${err}`);
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