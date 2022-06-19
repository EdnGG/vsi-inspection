import {
  getAllDocuments,
  createDocument,
  updateDocument,
} from '../../services';

export default {
  namespaced: true,
  state: {
    InspectionsFromFirestore: [],
  },
  mutations: {
    GET_INSPECTIONS(state, payload) {
      state.InspectionsFromFirestore = payload;
    },
  },
  actions: {
    async updatingInspection({ commit }, payload) {
      console.log('payload: ', payload);
      try {
        await updateDocument('inspections', payload.uid, {
          inspection: payload.data,
        });
      } catch (error) {
        console.error('error: ', error);
      }
    },
    async addInspection({ commit }, payload) {
      try {
        const doc = await createDocument('inspections', {
          inspection: payload,
        });
        console.log('Document written with ID: ', doc);
        // commit('ADD_INSPECTION', payload);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    },
    async getInspections({ commit }) {
      try {
        const data = await getAllDocuments('inspections');
        console.log('data: ', data);
        commit('GET_INSPECTIONS', data);
      } catch (err) {
        console.log('Error: ', err);
      }
    },
  },

  getters: {},
};
