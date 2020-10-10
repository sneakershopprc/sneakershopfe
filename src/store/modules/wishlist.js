import SSCore from '../../service/SSCore'
const API_URL = '/api/WishLists'

export const wishlist = {
  namespaced: true,
  state: {
    _productInWishlist: '',
    _wishlist: [],
    _totalCount: 0,
    _totalPage: 0,

  },
  getters: {},
  mutations: {
    _addWishList(state, obj) {
      state._wishlist.add(obj)
    },
    _removeishlist(state, obj) {
      let index = state._wishlist.findIndex(s => s.productId == obj.productId);
      if (index != -1) {
        state._wishlist.splice(index, 1)
      }
    },
    _setProduct(state, _productInWishlist) {
      state._productInWishlist = _productInWishlist
    },
    _setWishlist(state, _wishlist) {
      state._wishlist = _wishlist
    },
    _setTotalCount(state, _totalCount) {
      state._totalCount = _totalCount
    },
    _setTotalPage(state, _totalPage) {
      state._totalPage = _totalPage
    },
  },
  actions: {
    _getAllProductInWishlist(context) {
      return SSCore.get(API_URL).then(
        response => {
          context.commit('_setWishlist', response.data.data)
          context.commit('_setTotalCount', response.data.totalCount)
          context.commit('_setTotalPage', response.data.totalPages)
          return response.data
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    _getProductInWishlist(context, productId) {
      return SSCore.get(API_URL + '/' + productId).then(
        response => {
          context.commit('_setProduct', response.data)
          return response.data
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    _addProductToWishlist(context, productId) {
      return SSCore.post(API_URL, {
        productId: productId
      }).then(
        response => {
          return response.data
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    _removeProductFromWishlist(context, productId) {
      return SSCore.delete(API_URL + "/" + productId).then(
        response => {
          return response.data
        },
        error => {
          return Promise.reject(error)
        }
      )
    }
  }
}
