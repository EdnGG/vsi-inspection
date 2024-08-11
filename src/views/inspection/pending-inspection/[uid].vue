<template>
  <v-container fluid>
    <div id="add_inspection--title">
    <v-row class="text-center ">
      <v-col cols="12" sm="12" justify-center align-center >
        <h1>Inspection Report</h1>
        
      </v-col>
    </v-row>
  </div>
    <v-row class="text-center">
      <v-col justify-center align-center cols="12" sm="12" class="text-center">
        <pending-inspection></pending-inspection> 
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import pendingInspection from '@/components/inspection/pending-inspection/PendingInspection.vue';

import { db } from '@/firebase';
import { mapState, mapActions } from 'vuex';
export default {
  components: {
    pendingInspection,
  },
  name: 'pending-inspections-id',
  data() {
    return {
      currentInspection: {
        data: [],
      },
      currentDataId: null,
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
     
    };
  },
  created() {
    this.isLoading = true;
    this.currentDataId = this.$route.params.id;
    console.log('this.currentDataId', this.currentDataId);
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
  },
  methods: {
    ...mapActions('inspection', ['updatingInspection', 'deleteActuator']),
    async updatingData() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.currentInspection.data[this.editedIndex],
          this.editedItem,
        );
      } else {
        this.currentInspection.data.push(this.editedItem);
      }
      await this.updatingInspection({
        uid: this.$route.params.uid,
        data: this.currentInspection,
      });
      this.close();
    },
    async deleteItemConfirm() {
      try {
        this.currentInspection.data.splice(this.editedIndex, 1);
        await this.deleteActuator({
          uid: this.$route.params.uid,
          data: this.currentInspection,
        });
        this.closeDelete();
      } catch (error) {
        console.log(error);
      }
    },
    editItem(item) {
      this.editedIndex = this.currentInspection.data.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.currentInspection.data.indexOf(item);
      this.editedItem = { ...item };
      this.dialogDelete = true;
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
