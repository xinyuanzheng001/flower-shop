import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_USER_REQUEST,
  ORDER_LIST_USER_SUCCESS,
  ORDER_LIST_USER_FAIL,
  ORDER_LIST_ADMIN_REQUEST,
  ORDER_LIST_ADMIN_SUCCESS,
  ORDER_LIST_ADMIN_FAIL,
  ORDER_LIST_ADMIN_ALL_REQUEST,
  ORDER_LIST_ADMIN_ALL_SUCCESS,
  ORDER_LIST_ADMIN_ALL_FAIL,
  ORDER_DELIEVERED_REQUEST,
  ORDER_DELIEVERED_SUCCESS,
  ORDER_DELIEVERED_FAIL,
} from '../constants/orderConstants'
import axios from 'axios'
import { CART_ITEM_RESET } from '../constants/cartConstants'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/orders', order, config)
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: CART_ITEM_RESET,
    })
    localStorage.removeItem('cartItems')
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getOrderDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAIL_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/orders/${id}`, config)
    dispatch({
      type: ORDER_DETAIL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.put(`/api/orders/${id}/pay`, paymentResult, config)
    dispatch({
      type: ORDER_PAY_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const delieverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIEVERED_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.put(`/api/orders/${order._id}`, order, config)
    dispatch({
      type: ORDER_DELIEVERED_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: ORDER_DELIEVERED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getOrderList =
  (pageNumber = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_USER_REQUEST,
      })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(
        `/api/orders/myorders?pageNumber=${pageNumber}`,
        config
      )
      dispatch({
        type: ORDER_LIST_USER_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ORDER_LIST_USER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getUserOrderList =
  (id, pageNumber = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_ADMIN_REQUEST,
      })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(
        `/api/orders/${id}/orders?pageNumber=${pageNumber}`,
        config
      )
      dispatch({
        type: ORDER_LIST_ADMIN_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ORDER_LIST_ADMIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getAllOrdersList =
  (pageNumber = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_ADMIN_ALL_REQUEST,
      })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(
        `/api/orders?pageNumber=${pageNumber}`,
        config
      )
      dispatch({
        type: ORDER_LIST_ADMIN_ALL_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ORDER_LIST_ADMIN_ALL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
