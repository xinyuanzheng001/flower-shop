import {
  GO_TO_SHIPPING_PAGE,
  REMOVE_GO_TO_SHIPPING_PAGE,
} from '../constants/shippingConstant'

export const shippingReducer = (state = { goToShipping: false }, action) => {
  switch (action.type) {
    case GO_TO_SHIPPING_PAGE:
      return { ...state, goToShipping: true }
    case REMOVE_GO_TO_SHIPPING_PAGE:
      return { ...state, goToShipping: false }
    default:
      return state
  }
}
