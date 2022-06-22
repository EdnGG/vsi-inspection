import {
  getAllDocuments,
  createDocument,
  updateDocument,
  getPaginationLength
} from '../../services';

export default { 
  namespaced: true,
  state: {
    InspectionsFromFirestore: [],
    paginationLength: 0,
  },
  mutations: {
    SET_PAGINATION(state, payload) { 
      state.paginationLength = payload;
    },
    GET_INSPECTIONS(state, payload) {
      state.InspectionsFromFirestore = payload;
    },
  },
  actions: {
    // async getPagination({ commit }, payload) { 
    //   // Need to check this action
    //   const { collection, page } = payload;
    //   const querySnapshot = await getAllDocuments(collection);
    //   const data = querySnapshot.docs.map((doc) => {
    //     return { ...doc.data(), uid: doc.id };
    //   });
    //   const pagination = {
    //     data,
    //     page,
    //     totalPages: Math.ceil(data.length / 10),
    //   };
    //   console.log('pagination: ', pagination);
    //   commit('SET_PAGINATION', pagination);
    //   return pagination;

    // },
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
        const pages = await getPaginationLength('inspections')
        console.log('data: ', data);
        console.log('objects: ', pages);
        commit('SET_PAGINATION', pages)
        commit('GET_INSPECTIONS', data);
      } catch (err) {
        console.log('Error: ', err);
      }
    },
  },

  getters: {},
};
