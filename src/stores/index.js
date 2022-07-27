import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    pidList: []
  },
  mutations: {
    increment(state, payload) {
      state.pidList = payload.pidList
    }
  }
})

export default store;