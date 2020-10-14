import SSCore from '../../service/SSCore'
const API_URL = '/api/Orders'

export const order = {
  namespaced: true,
  state: {
    _orderList: [],
    _totalCount: 0,
    _totalPage: 0,
  },
  getters: {},
  mutations: {
    _setOrderList (state, _orderList) {
      state._orderList = _orderList
    },
    _setTotalCount(state, _totalCount) {
      state._totalCount = _totalCount
    },
    _setTotalPage(state, _totalPage) {
      state._totalPage = _totalPage
    },
  },
  actions: {
    _getOrderList (context, obj) {
      return SSCore.get(API_URL, obj).then(
        response => {
          context.commit('_setOrderList', response.data.data)
          context.commit('_setTotalCount', response.data.totalCount)
          context.commit('_setTotalPage', response.data.totalPages)
          return response.data
        },
        error => {
          return Promise.reject(error)
        }
      )
    }
  }
}
