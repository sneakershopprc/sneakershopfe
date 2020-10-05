import SSCore from '../../service/SSCore'
const API_URL = '/api/ShippingAddresss'

export const shippingAddress = {
  namespaced: true,
  state: {
    _shippingAddressList: []
  },
  getters: {},
  mutations: {
    _setShippingAddressList (state, _shippingAddressList) {
      state._shippingAddressList = _shippingAddressList
    }
  },
  actions: {
    _getShippingAddressList (context) {
      return SSCore.get(API_URL, {
      }).then(
        response => {
          context.commit('_setShippingAddressList', response.data.data)
          return response.data
        },
        error => {
          return Promise.reject(error)
        }
      )
    }
  }
}
