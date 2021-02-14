import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_DELIVERY_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';
export const cartReducer = (
  state = { cartItems: [], deliveryAddress: {} },
  action
) => {
  switch (action.type) {
    // add an item into the cart saved in carItems
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find(x => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    // Remove item from cart
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.product !== action.payload),
      };

    // Adding delivery address to the state by setting it as the payload
    case CART_SAVE_DELIVERY_ADDRESS:
      return {
        ...state,
        deliveryAddress: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    default:
      return state;
  }
};
