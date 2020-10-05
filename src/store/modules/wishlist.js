import SSCore from '../../service/SSCore'
const API_URL = '/api/Wishlists'

export const wishlist = {
  namespaced: true,
  state: {
    _wishlistList: []
  },
  getters: {},
  mutations: {
    _setWishlistList (state, _wishlistList) {
      state._wishlistList = _wishlistList
    }
  },
  actions: {
    _getWishlistList (context) {
      return SSCore.get(API_URL, {
      }).then(
        response => {
          context.commit('_setWishlistList', response.data.data)
          return response.data
        },
        error => {
          return Promise.reject(error)
        }
      )
    }
  }
}
