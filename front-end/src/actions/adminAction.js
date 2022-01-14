import axios from 'axios'
import {
  ADMIN_PARAMS_REQUEST,
  ADMIN_PARAMS_SUCCESS,
  ADMIN_PARAMS_FAIL,
  ADMIN_PARAMS_UPDATE_REQUEST,
  ADMIN_PARAMS_UPDATE_SUCCESS,
  ADMIN_PARAMS_UPDATE_FAIL,
} from '../constants/adminConstants'

export const getParams = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_PARAMS_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get('/api/params', config)
    dispatch({
      type: ADMIN_PARAMS_SUCCESS,
      payload: data,
    })

    localStorage.setItem('params', JSON.stringify(getState().admin.params))
  } catch (error) {
    dispatch({
      type: ADMIN_PARAMS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateParams = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_PARAMS_UPDATE_REQUEST,
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
    const { data } = await axios.put('/api/params', params, config)
    dispatch({
      type: ADMIN_PARAMS_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ADMIN_PARAMS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
