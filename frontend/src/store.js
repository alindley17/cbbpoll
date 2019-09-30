import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	// apiUrl: 'https://api.cbbpoll.com/?',
  	apiUrl: 'http://localhost:8000/',
  	serverToken: '',
  	user: {
  		nickname: '',
  		is_admin: false,
  		is_voter: false
  	}
  },
  mutations: {
  	saveSession(state, payload) {
  		state.serverToken = payload.token;
  		state.user.nickname = payload.username;
  	},
  	quitSession(state, payload) {
  		state.serverToken = '';
  		state.user = {
  			nickname: '',
  			is_admin: false,
  			is_voter: false
  		};
  	},
  	saveUser(state, payload) {
  		state.user = payload;
  	}
  },
  actions: {

  },
  plugins: [
    createPersistedState({ storage: window.sessionStorage })
  ]
})
