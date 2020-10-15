// import axios from 'axios'
import SSCore from '../../service/SSCore'
const API_URL = '/api/login'

const user = JSON.parse(localStorage.getItem('UserInfo'))
const initialState = user 
  ? {
    _status: {
      loggedIn: true
    },
    _user: user
  }
  : {
    _status: {
      loggedIn: false
    },
    _user: {
      fullname: '',
      photo: ''
    }
  }

export const auth = {
  namespaced: true,
  state: initialState,
  mutations: {
    _loginSuccess (state, user) {
      state._status.loggedIn = true
      state.user = user
    },
    _loginFailure (state) {
      state._status.loggedIn = false
      state.user = null
    },
    _logout (state) {
      state._status.loggedIn = false
      state.user = null
    },
    _registerSuccess (state) {
      state._status.loggedIn = false
    },
    _registerFailure (state) {
      state._status.loggedIn = false
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
            context.state._user = response.data
            context.state._status.loggedIn = true
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
      localStorage.clear();
      commit('_logout')
    },
    _register (context, user) {
      return SSCore.post('/api/user', user)
      .then(response => {
          localStorage.setItem('UserInfo', JSON.stringify(response.data))
          context.state._user = response.data
          context.state._status.loggedIn = true
          return Promise.resolve(response.data)
        },
        error => {
          context.commit('_registerFailure')
          return Promise.reject(error)
        }
      )
    },
    _updateProfile (context, user) {
      return SSCore.put('/api/accounts', user)
      .then(response => {
        localStorage.setItem('UserInfo', JSON.stringify(response.data))
        context.state._user = response.data
        return Promise.resolve(response.data)
      },
      error => {
        return Promise.reject(error)
      })
    }
  }
}
