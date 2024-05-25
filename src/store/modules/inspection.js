import router from '../../router';
import {
  getAllDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  getPaginationLength,
} from '../../services';

import { showSnackbar } from '../../helpers/snackbar';
// import { indexOf } from "core-js/core/array";

export default {
  namespaced: true,
  state: {
    InspectionsFromFirestore: [],
    paginationLength: 0,
    lastDocument: null,
    pendingInspection: null,
    pagination: {
      totalPages: 0,
      currentPage: 0,
      disabled: false,
    },
    snackbar: {
      show: false,
      text: '',
    },
  },
  mutations: {
    SHOW_SNACKBAR(state, payload) {
      let timeout = 0;
      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 300;
      }
      setTimeout(() => {
        (state.snackbar.show = true), (state.snackbar.text = payload);
      }, timeout);
    },
    SET_LAST_DOCUMENT(state, payload) {
      state.lastDocument = payload;
    },
    SET_PAGINATION(state, payload) {
      state.pagination = payload;
    },
    GET_INSPECTIONS(state, payload) {
      state.InspectionsFromFirestore =
        state.InspectionsFromFirestore.concat(payload);
    },
    CONTINUE_LATER_INSPECTION(state, payload) {
      state.pendingInspection = payload;
      // state.continueLaterInspection = localStorage.getItem('continueLaterInspection');
    },
  },
  actions: {
    async deleteActuator({ commit }, payload) {
      try {
        await deleteDocument('inspections', payload.uid, {
          inspection: payload.data,
        });
        showSnackbar.success(commit, 'Actuator deleted successfully');
      } catch (error) {
        showSnackbar.error(commit, err.message);
        console.error('error: ', error.message);
      }
    },
    async updatingInspection({ commit }, payload) {
      // console.log('payload: ', payload);
      try {
        await updateDocument('inspections', payload.uid, {
          inspection: payload.data,
        });
        showSnackbar.success(commit, 'inspection updated');
      } catch (error) {
        showSnackbar.error(commit, error.message);
        console.error('error: ', error.message);
      }
    },
    async addInspection({ commit }, payload) {
      try {
        const doc = await createDocument('inspections', {
          inspection: payload,
        });
        router.push('/inspection/details');
        showSnackbar.success(commit, 'inspection added');
        // console.log('Document written with ID: ', doc);
        // commit('ADD_INSPECTION', payload);
      } catch (error) {
        showSnackbar.error(commit, error.message);
        console.error('Error adding document: ', error.message);
      }
    },
    async getInspections({ commit, state }, { limit, startAfter }) {
      try {
        // if (state.pagination.disabled) return;
        console.log('startAfter: ', startAfter);
        const { data, lastVisible, total } = await getAllDocuments(
          'inspections',
          {
            limit,
            lastVisible: startAfter,
          },
        );
        // debugger;
        commit('SET_LAST_DOCUMENT', lastVisible);
        commit('GET_INSPECTIONS', data);
      } catch (error) {
        console.log('Error: ', error.message);
      }
    },

    addActuatorToInspection({ commit }, payload) {
      console.log('Payload: ', payload);
      Object.entries(payload).forEach(([key, value]) => {
        // console.log('key: ', key);
        // console.log('value: ', value);
        if (value === '') {
          return showSnackbar.error(commit, 'Please fill all fields');
        } else {
          showSnackbar.success(commit, 'Actuator added');
        }
      });
    },

    continueLaterInspection({ commit }, payload) {
      console.log('continue later inspection: ', payload);
      localStorage.setItem('continueLaterInspection', JSON.stringify(payload));
      commit('CONTINUE_LATER_INSPECTION', payload);
      router.push('/inspection/pending-inspection');
      // showSnackbar.success(commit, 'inspection saved for later');
    },
  },

  getters: {},
};
