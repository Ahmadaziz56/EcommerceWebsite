import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { DeleteReviewsReducer, allReviewsReducer, deleteProductReducer, newProductReducer, productDetailsReducer, productReduces, sumbitReviwReducer } from "./reducers/productreducer";
import { ProfileReducer, allUsersReducer, forgetPasswordReducer, userDetailsReducer, userReducer } from "./reducers/UserReducer"
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";
const reducer = combineReducers({
  products: productReduces,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: ProfileReducer,
  forgetPassword: forgetPasswordReducer,
  cart:cartReducer,
  newOrder:newOrderReducer,
  myOrders:myOrdersReducer,
  orderDetails:orderDetailsReducer,
  newReview:sumbitReviwReducer,
  newProduct:newProductReducer,
  deleteProduct:deleteProductReducer,
  allOrders:allOrdersReducer,
  order:orderReducer,
  allUsers:allUsersReducer,
  userDetails:userDetailsReducer,
  productReviews:allReviewsReducer,
  review:DeleteReviewsReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    shippingInfo:localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) :{}
  },
};
const middleware = [thunk];

// Corrected createStore function
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
