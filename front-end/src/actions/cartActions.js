import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_RECEIVER_INFO,
  CART_SAVE_RECEIVE_METHOD,
  CART_SAVE_RECEIVE_NAME,
  CART_SAVE_RECEIVE_PHONE_NUMBER,
  CART_SAVE_RECEIVE_TIME,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'

//add item into cart and save in local browser
export const addToCart =
  (
    id,
    qty,
    color,
    qtyAmount,
    qtyAmountPrice,
    price,
    cardMessage,
    specialInstruction
  ) =>
  async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        primeImage: data.primeImage,
        price: price,
        qty,
        qtyAmount,
        color,
        cardMessage,
        specialInstruction,
        qtyAmountPrice,
      },
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}

export const saveReceiveMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_RECEIVE_METHOD,
    payload: data,
  })
  localStorage.setItem('receiveMethod', JSON.stringify(data))
}

// export const saveReceiveTime = (data) => (dispatch) => {
//   dispatch({
//     type: CART_SAVE_RECEIVE_TIME,
//     payload: data,
//   })
//   localStorage.setItem('receiveTime', JSON.stringify(data))
// }

// export const saveReceivePhoneNumber = (data) => (dispatch) => {
//   dispatch({
//     type: CART_SAVE_RECEIVE_PHONE_NUMBER,
//     payload: data,
//   })
//   localStorage.setItem('receivePhoneNumber', JSON.stringify(data))
// }

export const saveReceiveInfo = (name, phoneNumber, time) => (dispatch) => {
  dispatch({
    type: CART_SAVE_RECEIVE_TIME,
    payload: time,
  })
  dispatch({
    type: CART_SAVE_RECEIVE_PHONE_NUMBER,
    payload: phoneNumber,
  })
  dispatch({
    type: CART_SAVE_RECEIVE_NAME,
    payload: name,
  })
  localStorage.setItem('receiveTime', JSON.stringify(time))
  localStorage.setItem('receivePhoneNumber', JSON.stringify(phoneNumber))
  localStorage.setItem('receiveName', JSON.stringify(name))
}

export const saveReceiverInfo = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_RECEIVER_INFO,
    payload: data,
  })

  localStorage.setItem('receiverInfo', JSON.stringify(data))
}
