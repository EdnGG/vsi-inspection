import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import { db }  from '../firebase.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    weather: {},
    allInpections: [],
    actuators: [],
  },
  mutations: {
    SET_LOCAL_WEATHER(state, payload) {
      state.weather = payload
    },
    ADD_ACTUATOR(state, payload) {
      state.actuators.push(payload)
    },
    ADD_INSPECTION(state, payload) {
      state.allInpections.push(payload)
    }
  },
  actions: {
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
    getLocalWeather({ commit }) {
      try{
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        // const datos = 
        // const res = ''
        // need to find the client location 
        // const url = `https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid=${process.env.VUE_APP_WEATHER_API_KEY}&units=imperial`
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.VUE_APP_WEATHER_API_KEY}&units=imperial`
        axios.get(url)
          .then(res => {
            const weather = res.data
            console.log(weather)
            commit('SET_LOCAL_WEATHER', weather)
          })
          .catch(err => {
            console.log(err)
          })

      })
    } catch(e){
      console.error(e)
    }
    },
  },
  modules: {
  }
})
