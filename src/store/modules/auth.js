// import axios from 'axios'
import SSCore from '../../service/SSCore'
const API_URL = '/api/v1/Auth'

const user = JSON.parse(localStorage.getItem('UserInfo'))
const initialState = user
  ? {
    status: {
      loggedIn: true
    },
    user
  }
  : {
    status: {
      loggedIn: false
    },
    user: null
  }

export const auth = {
  namespaced: true,
  state: initialState,
  mutations: {
    _loginSuccess (state, user) {
      state.status.loggedIn = true
      state.user = user
    },
    _loginFailure (state) {
      state.status.loggedIn = false
      state.user = null
    },
    _logout (state) {
      state.status.loggedIn = false
      state.user = null
    },
    _registerSuccess (state) {
      state.status.loggedIn = false
    },
    _registerFailure (state) {
      state.status.loggedIn = false
    }
  },
  actions: {
    _login (context, user) {
      return SSCore.post(API_URL, {
        username: user.username,
        password: user.password
      }).then(
        response => {
          if (response.data.token) {
            localStorage.setItem('UserInfo', JSON.stringify(response.data))
            context.commit('_loginSuccess', user)
          }
          return response.data
        },
        error => {
          context.commit('_loginFailure')
          return Promise.reject(error)
        }
      )
    },
    _loginWithGoogle (context, idToken) {
      return SSCore.post(API_URL + '/Google', {
        idToken: idToken
      }).then(
        response => {
          if (response.data.token) {
            localStorage.setItem('UserInfo', JSON.stringify(response.data))
            context.commit('_loginSuccess', user)
          }
          return response.data
        },
        error => {
          context.commit('_loginFailure')
          return Promise.reject(error)
        }
      )
    },
    _logout ({ commit }) {
      localStorage.removeItem('UserInfo')
      commit('_logout')
    },
    _register (context, user) {
      return SSCore.post(API_URL + '/Register', {
        username: user.username,
        email: user.email,
        password: user.password
      }).then(
        response => {
          context.commit('_registerSuccess')
          return Promise.resolve(response.data)
        },
        error => {
          context.commit('_registerFailure')
          return Promise.reject(error)
        }
      )
    }
  }
}
