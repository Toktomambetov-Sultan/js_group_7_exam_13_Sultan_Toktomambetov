import {
  CLEAR_CURRENT_REVIEW,
  CLEAR_REVIEWS,
  SET_CURRENT_REVIEW,
  SET_REVIEWS,
} from "../actionsTypes";

const initialState = {
  reviews: [],
  currentReview: {
    rates: {},
    text: "",
  },
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_REVIEW:
      return { ...state, currentReview: action.data };
    case SET_REVIEWS:
      return { ...state, reviews: action.data };
    case CLEAR_CURRENT_REVIEW:
      return {
        ...state,
        currentReview: initialState.currentReview,
      };
    case CLEAR_REVIEWS:
      return { ...state, reviews: initialState.reviews };
    default:
      return { ...state };
  }
};

export default reducer;