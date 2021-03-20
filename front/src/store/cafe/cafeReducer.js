import {
  SET_CAFE_LIST,
  SET_CURRENT_CAFE,
} from "../actionsTypes";

const initialState = {
  currentCafe: {
    checkBox: false,
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
      return { ...state, currentCafe: action.data };
    case SET_CAFE_LIST:
      return { ...state, cafeList: action.data };
    default:
      return { ...state };
  }
};

export default reducer;