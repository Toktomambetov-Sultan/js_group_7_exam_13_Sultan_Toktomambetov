import {
  CLEAR_ERRORS,
  FETCH_ERROR,
  FETCH_REQUEST,
  FETCH_SUCCESS,
} from "../actionsTypes";

const initialState = {
  isLoading: false,
  errors: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_SUCCESS:
      return { ...state, isLoading: false };
    case FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: action.error,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: {},
      };
    default:
      return { ...state };
  }
};

export default reducer;