import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";
import wishlistReducer from "./reducers/wishlistReducer";
import compareReducer from "./reducers/compareReducer";
import authReducer from "./authentication/reducers";
import profile from "./profile/reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  profile,
  productData: productReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  compareData: compareReducer,
});

export default rootReducer;
