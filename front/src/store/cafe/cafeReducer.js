import {
  CLEAR_CAFE_LIST,
  CLEAR_CURRENT_CAFE,
  SET_CAFE_LIST,
  SET_CURRENT_CAFE,
} from "../actionsTypes";

const initialState = {
  currentCafe: {
    checkbox: false,
    description: "",
    title: "",
    image: null,
    rate: "",
    photos: "",
  },
  cafeList: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_CAFE:
      return {
        ...state,
        currentCafe: action.data,
      };
    case SET_CAFE_LIST:
      return { ...state, cafeList: action.data };
    case CLEAR_CURRENT_CAFE:
      return {
        ...state,
        currentCafe: { ...initialState.currentCafe },
      };
    case CLEAR_CAFE_LIST:
      return {
        ...state,
        cafeList: [],
      };
    default:
      return { ...state };
  }
};

export default reducer;
