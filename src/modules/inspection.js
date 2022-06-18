export default {
  state: {
    // inspection: {},
    // user: null,
    // error: null,
    allInspections: [],
    InspectionsFromFirestore: [],
    actuators: [],
  },
  mutations: {
    UPDATING_INSPECTION(state, payload) {
      state.InspectionsFromFirestore = payload
    },
    GET_INSPECTIONS(state, payload) {
      state.InspectionsFromFirestore = payload;
    },
    ADD_ACTUATOR(state, payload) {
      state.actuators.push(payload)
    },
    ADD_INSPECTION(state, payload) {
      state.allInspections.push(payload)
    }
  },
  actions: {
    updatingInspection({ commit, state }, payload) {
      // console.log("state ",  state.allInpections)
      // try {
        /*No puedo encontrar el UId de la coleccion a la que se refiere el objeto
        db.collection('inspections').doc(payload.id).set({inspection: payload}).then((docRef) => {
          console.log("Document updating with ID: ", docRef)
        }).catch((error) => {
          console.error("Error adding document: ", error)
        })
        */
        //Que parametro lleva dentro del doc?

        db.collection('inspections').doc(payload.id).update({inspection: payload}).then((docRef) => {
          console.log("Document updating with ID: ", docRef)
        }).catch((error) => {
          console.error("Error adding document: ", error)
        })
        console.log("payload ", payload)
        // const response = await db.collection('inspections').doc().update({
        //   ...payload
        // })
        // commit('UPDATING_INSPECTION', payload)
      // } catch (err) {
      //   console.log(err)
      // }
    },
    addInspection({commit}, payload) {
      commit('ADD_INSPECTION', payload)
      db.collection('inspections').add({inspection: payload}).then((docRef) => {
        console.log("Document written with ID: ", docRef.id)
      }).catch((error) => {
        console.error("Error adding document: ", error)
      })
    },
    async getInspections({ commit }) {
      try {
        const allInspections = await db.collection('inspections').get()
        const data = allInspections.docs.map(doc => doc.data())
        commit('GET_INSPECTIONS', data)
      } catch (err) {
        console.log('Error: ', err)
      }
    },



  },

  getters: {

  },

}