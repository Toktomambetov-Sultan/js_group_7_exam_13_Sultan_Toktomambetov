import {
  CLEAR_PHOTOS,
  SET_CURRENT_PHOTO,
  SET_PHOTOS,
} from "../actionsTypes";

const initialState = {
  currentPhoto: {
    image: null,
  },
  photos: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_PHOTO:
      return { ...state, currentPhoto: action.data };
    case SET_PHOTOS:
      return { ...state, photos: action.data };
    case CLEAR_PHOTOS:
      return { ...state, photos: [] };
    default:
      return { ...state };
  }
};

export default reducer;
