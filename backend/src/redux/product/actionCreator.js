import { addProduct, getAllProduct, getProduct, updateProduct } from '../../api';
import actions from './actions';
// import initialState from '../../demoData/products.json';

const {
  singleProductBegin,
  singleProductSuccess,
  singleProductErr,

  filterProductBegin,
  filterProductSuccess,
  filterProductErr,

  sortingProductBegin,
  sortingProductSuccess,
  sortingProductErr,
} = actions;

const singleProduct = slug => {
  return async dispatch => {
    try {
      dispatch(singleProductBegin());
      const { data } = await getProduct(slug);
      dispatch(singleProductSuccess(data));
    } catch (err) {
      dispatch(singleProductErr(err));
    }
  };
};

export const editProduct = product => {
  return async dispatch => {
    try {
      dispatch(singleProductBegin());
      const { data } = await updateProduct(product);
      dispatch(singleProductSuccess(data));
    } catch (err) {
      dispatch(singleProductErr(err));
    }
  };
};

export const getAllProducts = () => {
  return async dispatch => {
    dispatch(filterProductBegin());
    try {
      const { data } = await getAllProduct();
      dispatch(filterProductSuccess(data));
    } catch (err) {
      dispatch(filterProductErr(err));
    }
  };
};

export const addNewProduct = (product, router) => {
  return async dispatch => {
    dispatch(filterProductBegin());
    try {
      const { data } = await addProduct(product);
      dispatch(filterProductSuccess(data));
      router.push('/admin/ecommerce');
    } catch (err) {
      dispatch(filterProductErr(err));
    }
  };
};

const sorting = sortBy => {
  return async dispatch => {
    try {
      dispatch(sortingProductBegin());

      const { data } = await getAllProduct();
      dispatch(sortingProductSuccess(data));
    } catch (err) {
      dispatch(sortingProductErr(err));
    }
  };
};

const filterByPriceRange = range => {
  return async dispatch => {
    dispatch(filterProductBegin());
    try {
      const { data } = await getAllProduct();
      dispatch(filterProductSuccess(data));
    } catch (err) {
      dispatch(filterProductErr(err));
    }
  };
};

const filterByRating = range => {
  return async dispatch => {
    try {
      dispatch(filterProductBegin());

      const { data } = await getAllProduct();
      dispatch(filterProductSuccess(data));
    } catch (err) {
      dispatch(filterProductErr(err));
    }
  };
};

const filterByBrand = brand => {
  return async dispatch => {
    try {
      dispatch(filterProductBegin());

      const { data } = await getAllProduct();
      dispatch(filterProductSuccess(data));
    } catch (err) {
      dispatch(filterProductErr(err));
    }
  };
};

const filterByCategory = category => {
  return async dispatch => {
    try {
      dispatch(filterProductBegin());

      const { data } = await getAllProduct();
      dispatch(filterProductSuccess(data));
    } catch (err) {
      dispatch(filterProductErr(err));
    }
  };
};

const updateWishList = id => {
  return async dispatch => {
    try {
      dispatch(filterProductBegin());

      const { data } = await getAllProduct();
      return dispatch(filterProductSuccess(data));
    } catch (err) {
      dispatch(filterProductErr(err));
    }
  };
};

export { singleProduct, sorting, filterByPriceRange, filterByRating, filterByBrand, filterByCategory, updateWishList };
