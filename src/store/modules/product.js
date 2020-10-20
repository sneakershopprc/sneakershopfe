import SSCore from '../../service/SSCore'
const API_URL = '/api/Products'

export const product = {
    namespaced: true,
    state: {
        _productList: [],
        _totalCount: 0,
        _totalPage: 0,
        _initFlg: true,
    },
    getters: {},
    mutations: {
        _setProductList(state, _productList) {
            state._productList = _productList
        },
        _setTotalCount(state, _totalCount) {
            state._totalCount = _totalCount
        },
        _setTotalPage(state, _totalPage) {
            state._totalPage = _totalPage
        },
        _setInitFlg(state, _initFlg) {
            state._initFlg = _initFlg
        }
    },
    actions: {
        _getProductList(context, obj) {
            let url = API_URL + `?Page=${obj.Page}&Size=${obj.Size}&SortBy=${obj.SortBy}`
            if (!context.state._initFlg && obj.Color !== undefined && obj.MinPrice !== undefined && obj.MaxPrice !== undefined) {
                if (obj.Color != "All") {
                    url += `&Color=${obj.Color}`
                }
                url += `&MinPrice=${obj.MinPrice}&MaxPrice=${obj.MaxPrice}`
                if (obj.BrandList != null && obj.BrandList.length > 0) {
                    for (let i = 0; i < obj.BrandList.length; i++) {
                        url += `&BrandList=${obj.BrandList[i]}`
                    }
                }
            }
            return SSCore.get(url).then(
                response => {
                    context.commit('_setProductList', response.data.data)
                    context.commit('_setTotalCount', response.data.totalCount)
                    context.commit('_setTotalPage', response.data.totalPages)
                    context.commit('_setInitFlg', false)
                    return response.data
                },
                error => {
                    return Promise.reject(error)
                }
            )
        }
    }
}
