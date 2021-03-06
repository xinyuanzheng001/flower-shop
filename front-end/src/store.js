import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewReducer,
  productTopRatedReducer,
  productListVipReducer,
  productListCategoryReducer,
  productListWithCategoryReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import { shippingReducer } from './reducers/shippingReducer'
import {
  orderListUserReducer,
  orderCreateReducer,
  orderDetailReducer,
  orderPayReducer,
  orderListAdminReducer,
  orderListAdminAllReducer,
  orderDelieverReducer,
  orderReceiveMethodReducer,
} from './reducers/orderReducer'
import { adminReducer, adminUpdateParamsReducer } from './reducers/adminReducer'

const reducer = combineReducers({
  admin: adminReducer,
  adminUpdateParams: adminUpdateParamsReducer,
  productList: productListReducer,
  productListVip: productListVipReducer,
  productListCategory: productListCategoryReducer,
  productListWithCategory: productListWithCategoryReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReview: productReviewReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetail: userDetailReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  shipping: shippingReducer,
  orderReceiveMethod: orderReceiveMethodReducer,
  orderCreate: orderCreateReducer,
  orderDetail: orderDetailReducer,
  orderPay: orderPayReducer,
  orderUserList: orderListUserReducer,
  orderDeliever: orderDelieverReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  orderListAdmin: orderListAdminReducer,
  orderListAdminAll: orderListAdminAllReducer,
})

// get items from local storage
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []
// get userInfo from local storage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
// get shipping address from local storage
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}
// get receive method from local storage
const receiveMethodFromStorage = localStorage.getItem('receiveMethod')
  ? JSON.parse(localStorage.getItem('receiveMethod'))
  : {}
// get payment method from local storage
const paymentMethodFromStorate = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : {}
// get receive time from local storage
const receiveTimeFromStorage = localStorage.getItem('receiveTime')
  ? JSON.parse(localStorage.getItem('receiveTime'))
  : {}
// get receiver phone number from local storage
const receivePhoneNumberFromStorage = localStorage.getItem('receivePhoneNumber')
  ? JSON.parse(localStorage.getItem('receivePhoneNumber'))
  : {}
// get receiver name from local storage
const receiveNameFromStorage = localStorage.getItem('receiveName')
  ? JSON.parse(localStorage.getItem('receiveName'))
  : {}
// get categories from local storage
const productCategoryFromStorage = localStorage.getItem('productCategory')
  ? JSON.parse(localStorage.getItem('productCategory'))
  : []

//get params from local storage
const paramsFromStorage = localStorage.getItem('params')
  ? JSON.parse(localStorage.getItem('params'))
  : {}

//get receiver info from local storage
const receiverInfoFromStorage = localStorage.getItem('receiverInfo')
  ? JSON.parse(localStorage.getItem('receiverInfo'))
  : {}
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    receiveMethod: receiveMethodFromStorage,
    paymentMethod: paymentMethodFromStorate,
    receiveTime: receiveTimeFromStorage,
    receivePhoneNumber: receivePhoneNumberFromStorage,
    receiveName: receiveNameFromStorage,
    receiverInfo: receiverInfoFromStorage,
  },
  productListCategory: {
    productCategory: [],
  },
  userLogin: { userInfo: userInfoFromStorage },
  admin: { params: paramsFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
