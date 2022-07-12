import router from "../../router";
import {
  getAllDocuments,
  createDocument,
  updateDocument,
  getPaginationLength,
} from '../../services';

import { showSnackbar } from '../../helpers/snackbar';


export default {
  namespaced: true,
  state: {
    InspectionsFromFirestore: [],
    paginationLength: 0,
    lastDocument: null,
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
    SHOW_SNACKBAR (state, payload) {
      let timeout = 0
      if (state.snackbar.show) {
        state.snackbar.show = false
        timeout = 300
      }
      setTimeout(() => {
        state.snackbar.show = true,
          state.snackbar.text = payload
      }, timeout)
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
  },
  actions: {
    async updatingInspection({ commit }, payload) {
      // console.log('payload: ', payload);
      try {
        await updateDocument('inspections', payload.uid, {
          inspection: payload.data,
        });
        showSnackbar.success(commit, 'inspection updated');
      } catch (error) {
        showSnackbar.error(commit, err.message);
        console.error('error: ', error);
      }
    },
    async addInspection({ commit }, payload) {
      try {
        const doc = await createDocument('inspections', {
          inspection: payload,
        });
        router.push("/inspection/details");
        showSnackbar.success(commit, 'inspection added');
        // console.log('Document written with ID: ', doc);
        // commit('ADD_INSPECTION', payload);
      } catch (error) {
        showSnackbar.error(commit, err.message);
        console.error('Error adding document: ', error);
      }
    },
    async getInspections({ commit, state }, { limit }) {
      try {
        if (state.pagination.disabled) return;

        const { data, lastVisible, total } = await getAllDocuments(
          'inspections',
          {
            limit,
            lastDocument: state.lastDocument,
          },
        );

        commit('SET_LAST_DOCUMENT', lastVisible);
        commit('GET_INSPECTIONS', data);

        const totalPages = Math.ceil(total / limit);
        const currentPage = state.pagination.currentPage + 1;

        commit('SET_PAGINATION', {
          totalPages,
          currentPage,
          disabled: totalPages === currentPage,
        });
      } catch (err) {
        console.log('Error: ', err);
      }
    },
    addActuatorToInspection({ commit }, payload) { 


      console.log('Payload: ', payload);

      let convertedPayload = []
      convertedPayload.push(payload)

      convertedPayload.forEach((element, i) => {
        console.log('Element: ', element);
        if ( element[i] === '') { 
          return console.log('empty');
        }
      });

      


      // for (let item of payload) { 
      //   console.log('item :', item)
      //   // if (item === '') { 
      //   //   console.log('Empty item');
      //   //   return showSnackbar.error(commit, 'Please fill all fields');
      //   // }
      // }

      // return 

      // Object.entries(payload).forEach((item, i) => { 
      //   console.log('index: ', i);
      //   console.log('item : ', item);
      //   // console.log('value: ', value);
      //   // Falla cuando quiere detectar si algun value esta vacio



      //   if (item === '') {
      //     return showSnackbar.error(commit, 'Please fill all fields');
      //   }
        
      //   // return
      //   // else {
      //   //   showSnackbar.success(commit, 'Actuator added');
      //   // }
        
      // })

      // return
      
    },
  },

  getters: {},
};
