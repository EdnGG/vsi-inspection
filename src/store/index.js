import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { db, storage, auth } from '../firebase.js';

import router from '../router';
import inspection from './modules/inspection';
import authentication from './modules/authentication';
import utils from './modules/utils';
import { getLocalWeather } from '../services';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    weather: {},
    // user: null,
    error: null,
    allInpections: [],
    actuators: [],
    desmetOrder: [],
    project: [],
    palletsPBFNO: [],
    palletsPBF: [],
  },
  mutations: {
    UPDATING_INSPECTION(state, payload) {
      state.InspectionsFromFirestore = payload;
    },
    SET_USER(state, payload) {
      state.user = payload;
      console.log('state.user: ', payload);
    },
    SET_ERROR(state, payload) {
      state.error = payload;
    },
    SET_LOCAL_WEATHER(state, payload) {
      state.weather = payload;
    },
    ADD_ACTUATOR(state, payload) {
      state.actuators.push(payload);
    },
    ADD_PROJECT_ITEM(state, payload) {
      state.project.push(payload);
    },
    ADD_INSPECTION(state, payload) {
      state.allInpections.push(payload);
    },
    ADD_DESMET_ORDER(state, payload) {
      state.desmetOrder.push(payload);
    },
    SAVE_PALLET(state, payload) {
      state.palletsPBF.push(payload);
    },
  },
  actions: {
    async getPalletsPBFNO({ commit }) {
      const palletsPBFNO = await db.collection('desmet-pallets-pbfno').get();
      palletsPBFNO.docs.forEach((doc) => {
        console.log('Docs:', doc.data());
        commit('SAVE_PALLET', doc.data());
      });
    },
    isUserActive({ commit }, user) {
      console.log('user from actions/isUserActive: ', user);
      commit('SET_USER', user);
    },
    savePallet({ commit }, payload) {
      console.log('payload: ', payload);
      commit('SAVE_PALLET', payload);
      db.collection('desmet-pallets-pbfno')
        .add({
          // payload
          palletNumber: payload.palletNumber,
          item: payload.items,
          image: payload.image,
        })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    },
    addProjectItem({ commit }, payload) {
      commit('ADD_PROJECT_ITEM', payload);
    },
    addDesmetOrder({ commit }, payload) {
      commit('ADD_DESMET_ORDER', payload);
      db.collection('desmetOrder')
        .add({ desmetOrder: payload })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    },
    async getLocalWeather({ commit }) {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const weather = await getLocalWeather({ lat, lng });
          commit('SET_LOCAL_WEATHER', weather);
        });
      } catch (e) {
        console.error(e);
      }
    },
  },
  getters: {
  },
  modules: {
    inspection,
    authentication,
    utils,
  },
  plugins: [createPersistedState({
    paths: ['authentication'],
  })],
});
