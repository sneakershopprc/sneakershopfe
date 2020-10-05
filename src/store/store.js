import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './modules/auth'
import { staff } from './modules/staff'
import { product } from './modules/product'
import { productDetail } from './modules/productDetail'
import { brand } from './modules/brand'
import { cart } from './modules/cart'
import { wishlist } from './modules/wishlist'
import { shippingAddress } from './modules/shippingAddress'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    _breadcrumbs: []
  },
  getters: {
    _getBreadcrumbs (state) {
      return state._breadcrumbs
    }
  },
  mutations: {
    _addBreadcrubs (state, object) {
      if (state._breadcrumbs.length > 0) {
        state._breadcrumbs[state._breadcrumbs.length - 1].disabled = false
      }
      state._breadcrumbs.push(object)
    },
    _addListBreadcrubs (state, list) {
      this._removeAll()
      list.forEach(element => {
        state._breadcrumbs.push(element)
      })
    },
    _removeAll (state, object) {
      state._breadcrumbs = []
    }
  },
  actions: {},
  modules: {
    auth,
    staff,
    product,
    productDetail,
    brand,
    cart,
    wishlist,
    shippingAddress
  }
})
