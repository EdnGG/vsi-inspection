import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    weather: {}
  },
  mutations: {
    SET_LOCAL_WEATHER(state, payload) {
      // console.log('Payload from mutations: ', payload)
      state.weather = payload
    }
  },
  actions: {
    async getLocalWeather({ commit }) {
      return await navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        // need to find the client location 
        // const url = `https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid=${process.env.VUE_APP_WEATHER_API_KEY}&units=imperial`
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.VUE_APP_WEATHER_API_KEY}&units=imperial`
        fetch(url)
          .then(response => { return response.json() })
          .then(data => {
            commit('SET_LOCAL_WEATHER', data)
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
  },
  modules: {
  }
})
