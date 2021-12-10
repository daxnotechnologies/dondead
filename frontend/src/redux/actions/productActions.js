import { getAllProduct } from "../../api";

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

// fetch products
const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await getAllProduct();
      dispatch(fetchProductsSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default fetchProducts;
