import SSCore from '../../service/SSCore'
const API_URL = '/api/Order'
const API_URL_Detail = '/api/OrderDetails'

export const cart = {
    namespaced: true,
    state: {
        _orderObj: {},
    },
    getters: {},
    mutations: {
        _setOrderObj(state, _orderObj) {
            state._orderObj = _orderObj
        },
    },
    actions: {
        _getCart(context) {
            return JSON.parse(localStorage["CART"])
        },
        _addItemToCart(context, obj) {
            let cart = localStorage["CART"]
            if (cart != null) {
                cart = JSON.parse(localStorage["CART"])
                let i = cart.findIndex(s => s.DetailId == obj.DetailId)
                if (i == -1) {
                    // chưa có trong cart
                    cart.push(obj);
                } else {
                    let x = cart[i]
                    cart[i].Quantity += obj.Quantity
                }
            } else {
                cart = []
                cart.push(obj);
            }
            localStorage.setItem("CART", JSON.stringify(cart))
        },
        _removeItemFromCart(context, id) {
            let cart = localStorage["CART"]
            if (cart != null) {
                cart = JSON.parse(localStorage["CART"])
                let i = cart.findIndex(s => s.DetailId == id)
                if (i == -1) {
                } else {
                    cart.splice(i, 1);
                }
                localStorage.setItem("CART", JSON.stringify(cart))
            }
        },
        _checkCart(context) {
            let cart = localStorage["CART"]
            if (cart != null) {
                cart = JSON.parse(localStorage["CART"])
            }
            return SSCore.post(API_URL_Detail, cart).then(
                response => {
                    return response.data
                },
                error => {
                    return Promise.reject("error")
                }
            )
        },
        _checkOut(context, shippingAddress) {
            let cart = localStorage["CART"]
            if(cart != null){
                cart = JSON.parse(localStorage["CART"])
                let obj = {}
                obj.Username = 'sonmap'
                obj.ReceiverNm = shippingAddress.ReceiverNm
                obj.Phonenumber = shippingAddress.Phonenumber
                obj.ShippingAddress = shippingAddress.ShippingAddress
                obj.Status = "Waiting"
                obj.OrderDetails = []
                for (let i = 0; i < cart.length; i++) {
                    obj.OrderDetails.add(_storeCart[i])
                }
                return SSCore.post(API_URL, obj).then(
                    response => {
                        context.commit('_setOrderObj', response.data)
                        return response.data
                    },
                    error => {
                        return Promise.reject("Your products is out of stock")
                    }
                )
            }
        }
    }
}
