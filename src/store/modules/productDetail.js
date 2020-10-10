import SSCore from '../../service/SSCore'
const API_URL = '/api/Products'
const API_URL_DETAIL = '/api/ProductDetails'

export const productDetail = {
  namespaced: true,
  state: {
    _productDetail: {}
  },
  getters: {},
  mutations: {
    _setProductDetail (state, _productDetail) {
      state._productDetail = _productDetail
    }
  },
  actions: {
    _getProductDetail (context, obj) {
      return SSCore.get(API_URL + "/" + obj.productId).then(
        response => {
          context.commit('_setProductDetail', response.data)
          return response.data
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    _getDetail (context, ProductDetailId) {
      return SSCore.get(API_URL_DETAIL + "/" + ProductDetailId).then(
        response => {
          context.commit('_setProductDetail', response.data)
          return response.data
        },
        error => {
          return Promise.reject(error)
        }
      )
    }
  }
}
