import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate'
import { db } from '../firebase.js';

import router from '../router'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    weather: {},
    allInpections: [],
    actuators: [],
    desmetOrder: [],
    project: []
  },
  mutations: {
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
    }
  },
  actions: {
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
        // const datos = 
        // const res = ''
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
  plugins: [createPersistedState()],
  modules: {
  }
})
