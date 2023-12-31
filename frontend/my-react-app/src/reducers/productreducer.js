import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_RESET,
  NEW_REVIEW_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_RESET,
  NEW_PRODUCT_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_RESET,
  PRODUCT_DELETE_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_FAIL,
  ALL_REVIEWS_REQUEST,
  ALL_REVIEWS_SUCCESS,
  ALL_REVIEWS_FAIL,
  CLEAR_ERRORS
} from "../constants/productConstant"
export const productReduces = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
    case ADMIN_PRODUCT_REQUEST:

      return {
        loading: true,
        products: []
      }
    case ALL_PRODUCT_SUCCESS:

      return {
        loading: false,
        products: action.payload.products,
        productcount: action.payload.productcount,
        resultperpage: action.payload.resultperpage,
        filteredProductsCount: action.payload.filteredProductsCount
      }
    case ADMIN_PRODUCT_SUCCESS:

      return {
        loading: false,
        products: action.payload.products
      }
    case ALL_PRODUCT_FAIL:
    case ADMIN_PRODUCT_FAIL:

      return {
        loading: false,
        error: action.payload
      }

    case CLEAR_ERRORS:

      return {
        ...state,
        error: null,
      }


    default:
      return state;
  }
}
export const productDetailsReducer = (state = { products: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:

      return {
        loading: true,
        ...state
      }
    case PRODUCT_DETAILS_SUCCESS:

      return {
        loading: false,
        products: action.payload,
      }
    case PRODUCT_DETAILS_FAIL:

      return {
        loading: false,
        error: action.payload
      }

    case CLEAR_ERRORS:

      return {
        ...state,
        error: null,
      }


    default:
      return state;
  }
}
export const sumbitReviwReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.products
      };
    case NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload
      };
    case PRODUCT_DELETE_FAIL:
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PRODUCT_DELETE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export const allReviewsReducer = (state = { reviews:[] }, action) => {
  switch (action.type) {
    case ALL_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ALL_REVIEWS_SUCCESS:

      return {
        loading: false,
        reviews: action.payload,
      }
    case ALL_REVIEWS_FAIL:

      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case CLEAR_ERRORS:

      return {
        ...state,
        error: null,
      }


    default:
      return state;
  }
}
export const DeleteReviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:

      return {
        ...state,
        loading: true,
      }
    case DELETE_REVIEW_SUCCESS:

      return {
        loading: false,
        isDeleted: action.payload,
      }
    case DELETE_REVIEW_FAIL:

      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case DELETE_REVIEW_RESET:

      return {
        ...state,
        loading: false,
        isDeleted:false
      }

    case CLEAR_ERRORS:

      return {
        ...state,
        error: null,
      }


    default:
      return state;
  }
}