import SSCore from '../../service/SSCore'
const API_URL = '/api/Brands'

export const brand = {
  namespaced: true,
  state: {
    _brandList: []
  },
  getters: {},
  mutations: {
    _setBrandList (state, _brandList) {
      state._brandList = _brandList
    }
  },
  actions: {
    _getBrandList (context) {
      return SSCore.get(API_URL, {
      }).then(
        response => {
          context.commit('_setBrandList', response.data.data)
          return response.data
        },
        error => {
          return Promise.reject(error)
        }
      )
    }
  }
}
