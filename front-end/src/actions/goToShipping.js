import {
  GO_TO_SHIPPING_PAGE,
  REMOVE_GO_TO_SHIPPING_PAGE,
} from '../constants/shippingConstant'

export const goToShipping = () => async (dispatch) => {
  dispatch({
    type: GO_TO_SHIPPING_PAGE,
  })
}

export const remove_go_to_shipping = () => async (dispatch) => {
  dispatch({
    type: REMOVE_GO_TO_SHIPPING_PAGE,
  })
}
