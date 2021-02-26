import axios from 'axios';

import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_INFORMATION_REQUEST,
  ORDER_INFORMATION_SUCCESS,
  ORDER_INFORMATION_FAIL,
  ORDER_PAYMENT_FAIL,
  ORDER_PAYMENT_SUCCESS,
  ORDER_PAYMENT_REQUEST,
  ORDER_HISTORY_REQUEST,
  ORDER_HISTORY_SUCCESS,
  ORDER_HISTORY_FAIL,
  ORDER_ALL_REQUEST,
  ORDER_ALL_SUCCESS,
  ORDER_ALL_FAIL,
  ORDER_DELIVERY_STATUS_FAIL,
  ORDER_DELIVERY_STATUS_REQUEST,
  ORDER_DELIVERY_STATUS_SUCCESS,
} from '../constants/orderConstants';
import { logout } from './userActions';

export const createOrder = order => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    //localStorage.removeItem('cartItems');
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};
export const getOrderInformation = id => async (dispatch, getState) => {
  try {
    //console.log('request order info');
    dispatch({
      type: ORDER_INFORMATION_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);
   // console.log('request order info success');
    dispatch({
      type: ORDER_INFORMATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    //console.log('request order info failed');
    dispatch({
      type: ORDER_INFORMATION_FAIL,
      payload: message,
    });
  }
};

export const makePayment = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
   // console.log('request payment');
    dispatch({
      type: ORDER_PAYMENT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );
   // console.log('request payment success');
    dispatch({
      type: ORDER_PAYMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
   // console.log('request payment failed');
    dispatch({
      type: ORDER_PAYMENT_FAIL,
      payload: message,
    });
  }
};

// Uses token to get any information therefore nothing passed in
export const userOrderHistory = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_HISTORY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/order-history`, config);

    dispatch({
      type: ORDER_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_HISTORY_FAIL,
      payload: message,
    });
  }
};

export const makeDelivery = order => async (dispatch, getState) => {
  try {
    //console.log('request payment');
    dispatch({
      type: ORDER_DELIVERY_STATUS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${order._id}/delivery`,
      {},
      config
    );
  //  console.log('request payment success');
    dispatch({
      type: ORDER_DELIVERY_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
   // console.log('request delivery failed');
    dispatch({
      type: ORDER_DELIVERY_STATUS_FAIL,
      payload: message,
    });
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_ALL_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders`, config);

    dispatch({
      type: ORDER_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_ALL_FAIL,
      payload: message,
    });
  }
};
