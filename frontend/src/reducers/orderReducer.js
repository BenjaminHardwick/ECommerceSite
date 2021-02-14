import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_INFORMATION_FAIL,
  ORDER_INFORMATION_SUCCESS,
  ORDER_INFORMATION_REQUEST,
  ORDER_PAYMENT_REQUEST,
  ORDER_PAYMENT_SUCCESS,
  ORDER_PAYMENT_FAIL,
  ORDER_PAYMENT_RESET,
} from '../constants/orderConstants';

export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    // case ORDER_CREATE_RESET:
    //return {};
    default:
      return state;
  }
};

// set loading to true, as it tries to load the order prior to loading actually being true
export const orderInformationReducer = (
  state = { loading: true, orderedProducts: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_INFORMATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_INFORMATION_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_INFORMATION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAYMENT_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAYMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAYMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAYMENT_RESET:
      return {};
    default:
      return state;
  }
};
