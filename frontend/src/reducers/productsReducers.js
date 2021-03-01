import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_REMOVE_REQUEST,
  PRODUCT_REMOVE_SUCCESS,
  PRODUCT_REMOVE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_LIST_BRANDS_REQUEST,
  PRODUCT_LIST_BRANDS_SUCCESS,
  PRODUCT_LIST_BRANDS_FAIL,
  PRODUCT_LIST_CATEGORY_SUCCESS,
  PRODUCT_LIST_CATEGORY_FAIL,
  PRODUCT_LIST_CATEGORY_REQUEST,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_BEST_RATED_REQUEST,
  PRODUCT_BEST_RATED_SUCCESS,
  PRODUCT_BEST_RATED_FAIL,
  PRODUCT_BEST_RATED_RESET,
  PRODUCT_LIST_BY_BRAND_SUCCESS,
  PRODUCT_LIST_BY_BRAND_FAIL,
  PRODUCT_LIST_BY_CATEGORY_REQUEST,
  PRODUCT_LIST_BY_CATEGORY_SUCCESS,
  PRODUCT_LIST_BY_CATEGORY_FAIL,
  PRODUCT_LIST_BY_BRAND_REQUEST,
} from '../constants/productConstants.js';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productListBrandsReducer = (state = { brands: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_BRANDS_REQUEST:
      return { loading: true, brands: [] };
    case PRODUCT_LIST_BRANDS_SUCCESS:
      return { loading: false, brands: action.payload };
    case PRODUCT_LIST_BRANDS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productListCategoryReducer = (
  state = { categories: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_CATEGORY_REQUEST:
      return { loading: true, categories: [] };
    case PRODUCT_LIST_CATEGORY_SUCCESS:
      return { loading: false, categories: action.payload };
    case PRODUCT_LIST_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productListByBrandsReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_BY_BRAND_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_BY_BRAND_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_BY_BRAND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productListByCategoryReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_BY_CATEGORY_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_BY_CATEGORY_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_BY_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const removeProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REMOVE_REQUEST:
      return { loading: true };
    case PRODUCT_REMOVE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_REMOVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createNewProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const updateProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const createReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const bestRatedProductReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_BEST_RATED_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_BEST_RATED_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_BEST_RATED_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_BEST_RATED_RESET:
      return {};
    default:
      return state;
  }
};
