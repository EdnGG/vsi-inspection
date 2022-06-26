import {
  getAllDocuments,
  createDocument,
  updateDocument,
  getPaginationLength,
} from '../../services';

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
  },
  mutations: {
    SET_LAST_DOCUMENT(state, payload) {
      state.lastDocument = payload;
    },
    SET_PAGINATION(state, payload) {
      state.pagination = payload;
    },
    GET_INSPECTIONS(state, payload) {
      // state.InspectionsFromFirestore =
      //   state.InspectionsFromFirestore.concat(payload);
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
    async getInspections({ commit, state }, payload) {
      try {
        const { data, lastVisible, total } = await getAllDocuments(
          'inspections',
          payload ,
        );

        console.log('data: ', data);
        commit('SET_LAST_DOCUMENT', lastVisible);
        commit('GET_INSPECTIONS', data);

        const totalPages = Math.ceil(total / payload.limit);
        const currentPage = payload.page;

        commit('SET_PAGINATION', {
          totalPages,
          currentPage,
          disabled: totalPages === currentPage,
        });
      } catch (err) {
        console.log('Error: ', err);
      }
    },
  },

  getters: {},
};
