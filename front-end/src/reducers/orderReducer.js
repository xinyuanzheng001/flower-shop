import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_USER_REQUEST,
  ORDER_LIST_USER_SUCCESS,
  ORDER_LIST_USER_FAIL,
  ORDER_LIST_USER_RESET,
  ORDER_LIST_ADMIN_REQUEST,
  ORDER_LIST_ADMIN_SUCCESS,
  ORDER_LIST_ADMIN_FAIL,
  ORDER_LIST_ADMIN_RESET,
  ORDER_LIST_ADMIN_ALL_REQUEST,
  ORDER_LIST_ADMIN_ALL_SUCCESS,
  ORDER_LIST_ADMIN_ALL_RESET,
  ORDER_LIST_ADMIN_ALL_FAIL,
  ORDER_DELIEVERED_REQUEST,
  ORDER_DELIEVERED_SUCCESS,
  ORDER_DELIEVERED_FAIL,
  ORDER_DELIEVERED_RESET,
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      }
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderDetailReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_DETAIL_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case ORDER_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const orderDelieverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIEVERED_REQUEST:
      return {
        loading: true,
      }
    case ORDER_DELIEVERED_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_DELIEVERED_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_DELIEVERED_RESET:
      return {}
    default:
      return state
  }
}

export const orderListUserReducer = (
  state = { orderListDetail: [] },
  action
) => {
  switch (action.type) {
    case ORDER_LIST_USER_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_USER_SUCCESS:
      return {
        loading: false,
        orderListDetail: action.payload.orders,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case ORDER_LIST_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_LIST_USER_RESET:
      return {
        orderListDetail: [],
      }
    default:
      return state
  }
}

export const orderListAdminReducer = (
  state = { orderListDetail: [] },
  action
) => {
  switch (action.type) {
    case ORDER_LIST_ADMIN_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_ADMIN_SUCCESS:
      return {
        loading: false,
        orderListDetail: action.payload.orders,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case ORDER_LIST_ADMIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_LIST_ADMIN_RESET:
      return {
        orderListDetail: [],
      }
    default:
      return state
  }
}

export const orderListAdminAllReducer = (
  state = { ordersListDetail: [] },
  action
) => {
  switch (action.type) {
    case ORDER_LIST_ADMIN_ALL_REQUEST:
      return { loading: true }
    case ORDER_LIST_ADMIN_ALL_SUCCESS:
      return {
        loading: false,
        ordersListDetail: action.payload.orders,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case ORDER_LIST_ADMIN_ALL_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_LIST_ADMIN_ALL_RESET:
      return { ordersListDetail: [] }
    default:
      return state
  }
}
