<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="inspection.data"
      sort-by="calories"
      class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>VSI Incomming report</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.actuatorModel"
                        label="Actuator Model"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.actuatorSerialNumber"
                        label="Actuator Serial Number"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.controlPack"
                        label="Control Pack"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.visual"
                        label="Visua"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.waterInspection"
                        label="Water Inspection"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.operationalTest"
                        label="Operational Test"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.wireCompartiment"
                        label="Wire Compartiment"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.handwheelBoltPatern"
                        label="Handwheel Bolt Patern"></v-text-field>
                    </v-col>
                    <v-row class="d-flex justify-center" >
                    <v-col cols="12" sm="6" md="4">
                      <v-textarea
                        v-model="editedItem.observaciones"
                        filled
                        auto-grow
                        label="Observations"></v-textarea>
                    </v-col>
                    </v-row>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="updatingData()"> Update </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <div>
          <v-alert :value="true" type="info" icon="mdi-alert-circle-outline">
            <span class="body-1">No data found.</span>
          </v-alert>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { db } from '@/firebase';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'Detail',
  data() {
    return {
      inspection: {
        data: [],
      },
      // inspection: [],
      currentDataUID: null,
      isLoading: false,
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,

      editedItem: {
        actuatorModel: '',
        actuatorSerialNumber: '',
        controlPack: '',
        visual: '',
        waterInspection: '',
        operationalTest: '',
        wireCompartiment: '',
        handwheelBoltPatern: '',
        observaciones: '',
      },

      defaultItem: {
        actuatorModel: '',
        actuatorSerialNumber: '',
        controlPack: '',
        visual: '',
        waterInspection: '',
        operationalTest: '',
        wireCompartiment: '',
        handwheelBoltPatern: '',
        observaciones: '',
      },
      headers: [
        { text: 'Actuator Model', value: 'actuatorModel' },
        {
          text: 'Actuator Serial Number',
          value: 'actuatorSerialNumber',
          sortable: false,
        },
        { text: 'Control Pack', value: 'controlPack', sortable: false },
        { text: 'Visual', value: 'visual', sortable: false },
        {
          text: 'Water Inspection',
          value: 'waterInspection',
          sortable: false,
        },
        {
          text: 'Operational Test',
          align: 'start',
          value: 'operationalTest',
        },
        { text: 'Wire Compartiment', value: 'wireCompartiment' },
        { text: 'Handwheel Bolt Patern', value: 'handwheelBoltPatern' },
        { text: 'Observations', value: 'observaciones' },
        { text: '', value: 'actions' },
      ],
    };
  },
  created() {
    // console.log('this.$route.params.uid: ', this.$route.params.uid);
    this.isLoading = true;
    db.collection('inspections')
      .doc(this.$route.params.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.inspection = doc.data().inspection;
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
  },
  methods: {
    ...mapActions('inspection', [
      'updatingInspection',
      // 'getInspections',
      // 'getPagination',
    ]),
    async updatingData() {
      await this.updatingInspection({
        uid: this.$route.params.uid,
        // uid: ,
        // objeto llega vacio
        // Se actuliza en firestore pero no en la vista
        data: (this.inspection.data = this.editedItem),
      });
      this.dialog = false;
    },
    editItem(item) {
      this.editedIndex = this.inspection.data.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.inspection.data.indexOf(item);
      this.editedItem = { ...item };
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.inspection.data[this.editedIndex], this.editedItem);
      } else {
        this.inspection.data.push(this.editedItem);
      }
      this.close();
      console.log(this.$route.params.uid);
      // Update inspection in firestore
      // this.$store.dispatch('updateInspection', this.inspection);
      console.log(this.inspection);
    },

    // save axios.post('/api/inspections', this.inspection.data({...this.editedItem}))
    // delete axios.delete('/api/inspections', this.inspection.data = this.inspection.data.filter(item => item.id !== this.editedItem.id))
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
};
</script>
