import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// Product Reducers
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productsReducers.js';
// User Reducers
import {
  userUpdateProfileReducer,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
} from './reducers/userReducers.js';
import { cartReducer } from './reducers/cartReducers';

import {
  createOrderReducer,
  orderInformationReducer,
  orderPaymentReducer,
} from './reducers/orderReducer';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  newOrder: createOrderReducer,
  orderInformation: orderInformationReducer,
  orderPayment: orderPaymentReducer,
});

const itemsInCartFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const usersInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const deliveryAddressFromStorage = localStorage.getItem('deliveryAddress')
  ? JSON.parse(localStorage.getItem('deliveryAddress'))
  : {};

const initialState = {
  cart: {
    cartItems: itemsInCartFromStorage,
    deliveryAddress: deliveryAddressFromStorage,
  },
  userLogin: { userInfo: usersInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
