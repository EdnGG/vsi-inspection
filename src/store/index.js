import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate'
import { db, storage, auth } from '../firebase.js';

import router from '../router'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    weather: {},
    user: null,
    error: null,
    allInpections: [],
    InspectionsFromFirestore: [],
    actuators: [],
    desmetOrder: [],
    project: [],
    palletsPBFNO: [],
    palletsPBF: [],
  },
  mutations: {
    UPDATING_INSPECTION(state, payload) { 
      state.InspectionsFromFirestore = payload
    },
    GET_INSPECTIONS(state, payload) {
      state.InspectionsFromFirestore = payload;
    },
    SET_USER(state, payload) {
      state.user = payload
      console.log('state.user: ', payload)
    },
    SET_ERROR(state, payload) {
      state.error = payload
    },
    SET_LOCAL_WEATHER(state, payload) {
      state.weather = payload
    },
    ADD_ACTUATOR(state, payload) {
      state.actuators.push(payload)
    },
    ADD_PROJECT_ITEM(state, payload) {
      state.project.push(payload)
    },
    ADD_INSPECTION(state, payload) {
      state.allInpections.push(payload)
    },
    ADD_DESMET_ORDER(state, payload) {
      state.desmetOrder.push(payload)
    },
    SAVE_PALLET(state, payload) {
      state.palletsPBF.push(payload)
    }
  },
  actions: {
    async updatingInspection({ commit }, payload) {
      try {
        console.log("id", id)
        const response = await db.collection('inspections').doc(payload.id).update({
          ...payload
        })
        console.log('response: ', response)
      } catch (error) {
        console.log(error)
      }
    },
    async getPalletsPBFNO({ commit }) {
      const palletsPBFNO = await db.collection('desmet-pallets-pbfno').get()
      palletsPBFNO.docs.forEach(doc => {
        console.log('Docs:', doc.data())
        commit('SAVE_PALLET', doc.data())
      })
    },
    isUserActive({ commit }, user ) {
      console.log('user from actions/isUserActive: ', user)
      commit('SET_USER', user)
    },
    signOut({ commit }) {
      auth.signOut().then(() => {
        router.push('/')
      })
    },
    loginUser({ commit }, payload) {
      auth.signInWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          const userLogged = {
            uid: res.user.uid,
            email: res.user.email,
            name: res.user.name || 'Joe Doe',
            role: res.user.role || 'USER',
          }
          commit('SET_USER', userLogged)
          router.push('/about')
        })
        .catch(error => {
          commit('SET_ERROR', error)
        })
    },
    createUser({ commit }, user) {
      auth.createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          console.log('res: ', res)
          const newUser = {
            uid: res.user.uid,
            email: res.user.email,
            name: res.user.name || 'Joe Doe',
            role: res.user.role || 'USER',
          }
          commit('SET_USER', newUser)
          router.push('/about')
        }).catch(error => {
          console.log('error: ', error)
          commit('SET_ERROR', error)
        })

    },
    savePallet({ commit }, payload) {
      console.log('payload: ', payload)
      commit('SAVE_PALLET', payload)
      db.collection('desmet-pallets-pbfno')
        .add({
          // payload
          palletNumber: payload.palletNumber,
          item: payload.items,
          image: payload.image,
        }).then((docRef) => {
          console.log("Document written with ID: ", docRef.id)
        }).catch((error) => {
          console.error("Error adding document: ", error)
        })
    },
    addProjectItem({ commit }, payload) {
      commit('ADD_PROJECT_ITEM', payload)
    },
    addActuator({ commit }, payload) {
      commit('ADD_ACTUATOR', payload)
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
    addDesmetOrder({commit}, payload) {
      commit('ADD_DESMET_ORDER', payload)
      db.collection('desmetOrder').add({desmetOrder: payload}).then((docRef) => {
        console.log("Document written with ID: ", docRef.id)
      }).catch((error) => {
        console.error("Error adding document: ", error)
      })
    },
    async getLocalWeather({ commit }) {
      try{
        navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        // need to find the client location
        // const url = `https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid=${process.env.VUE_APP_WEATHER_API_KEY}&units=imperial`
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.VUE_APP_WEATHER_API_KEY}&units=imperial`
        // const res = await axios.get(url)
        // const weather = await res.data
        // console.log(weather)
        // commit('SET_LOCAL_WEATHER', await weather)
        axios.get(url)
          .then(res => {
            const weather = res.data
            // console.log(weather)
            commit('SET_LOCAL_WEATHER', weather)
          })
          .catch(err => {
            console.error(err)
          })

      })
    } catch(e){
      console.error(e)
    }
    },
  },
  getters: {
    isUserExist(state) {
      if (state.user === null) {
        return false
      } else {
        return true
      }
    }

  },
  plugins: [createPersistedState()],
  modules: {
  }
})
