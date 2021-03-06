import {
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_RESET,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAIL_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_ADMIN_REQUEST,
  USER_UPDATE_ADMIN_SUCCESS,
  USER_UPDATE_ADMIN_FAIL,
  USER_UPDATE_ADMIN_RESET,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_REGISTER_RESET:
      return {}
    default:
      return state
  }
}

export const userDetailReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAIL_REQUEST:
      return { ...state, loading: true }
    case USER_DETAIL_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_DETAIL_FAIL:
      return { loading: false, error: action.payload }
    case USER_DETAIL_RESET:
      return { user: {} }
    default:
      return state
  }
}
export const userUpdateProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_ADMIN_REQUEST:
      return { ...state, loading: true }
    case USER_UPDATE_ADMIN_SUCCESS:
      return { loading: false, success: true }
    case USER_UPDATE_ADMIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_ADMIN_RESET:
      return {}
    default:
      return state
  }
}

export const userListReducer = (state = { usersList: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return {
        usersList: action.payload.users,
        loading: false,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case USER_LIST_RESET:
      return {
        loading: false,
        usersList: [],
      }
    default:
      return state
  }
}

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
