import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// Product Reducers
import {
  productListReducer,
  productDetailsReducer,
  removeProductReducer,
  createNewProductReducer,
  updateProductReducer,
  productListBrandsReducer,
  productListCategoryReducer,
  createReviewReducer,
  bestRatedProductReducer,
  productListByBrandsReducer,
  productListByCategoryReducer,
  productListKNNRecommendations,
} from './reducers/productsReducers.js';
// User Reducers
import {
  userUpdateProfileReducer,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userAccountsReducer,
  removeUserReducer,
  updateUserReducer,
} from './reducers/userReducers.js';
import { cartReducer } from './reducers/cartReducers';

import {
  createOrderReducer,
  orderDeliveryReducer,
  orderHistoryReducer,
  orderInformationReducer,
  orderLogbookReducer,
  orderPaymentReducer,
} from './reducers/orderReducer';

const reducer = combineReducers({
  productList: productListReducer,
  productBrands: productListBrandsReducer,
  productCategory: productListCategoryReducer,
  productByBrand: productListByBrandsReducer,
  productByCategory: productListByCategoryReducer,
  productDetails: productDetailsReducer,
  productRemove: removeProductReducer,
  productCreate: createNewProductReducer,
  productBestRated: bestRatedProductReducer,
  productUpdate: updateProductReducer,
  productNewReview: createReviewReducer,
  productKNNRecommended: productListKNNRecommendations,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userAccounts: userAccountsReducer,
  userRemove: removeUserReducer,
  userUpdate: updateUserReducer,
  newOrder: createOrderReducer,
  orderInformation: orderInformationReducer,
  orderPayment: orderPaymentReducer,
  orderDelivery: orderDeliveryReducer,
  orderHistory: orderHistoryReducer,
  orderLogbook: orderLogbookReducer,
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
