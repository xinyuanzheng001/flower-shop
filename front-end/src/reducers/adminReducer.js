import {
  ADMIN_PARAMS_REQUEST,
  ADMIN_PARAMS_SUCCESS,
  ADMIN_PARAMS_FAIL,
  ADMIN_PARAMS_UPDATE_REQUEST,
  ADMIN_PARAMS_UPDATE_FAIL,
  ADMIN_PARAMS_UPDATE_SUCCESS,
} from '../constants/adminConstants'

export const adminReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_PARAMS_REQUEST:
      return { loading: true }
    case ADMIN_PARAMS_SUCCESS:
      return { loading: false, params: action.payload }
    case ADMIN_PARAMS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminUpdateParamsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_PARAMS_UPDATE_REQUEST:
      return { loading: true }
    case ADMIN_PARAMS_UPDATE_SUCCESS:
      return { loading: false, success: true, params: action.payload }
    case ADMIN_PARAMS_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
