import { getAllProduct } from "../../api";

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

// fetch products
const fetchProducts = () => {
  return async (dispatch) => {
    const { data } = await getAllProduct();
    dispatch(fetchProductsSuccess(data));
  };
};

export default fetchProducts;
