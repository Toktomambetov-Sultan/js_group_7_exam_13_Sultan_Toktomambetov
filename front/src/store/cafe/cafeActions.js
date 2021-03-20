import axiosOrder from "../../axiosOrder";
import {
  SET_CAFE_LIST,
  SET_CURRENT_CAFE,
} from "../actionsTypes";
import {
  fetchError,
  fetchRequest,
  fetchSuccess,
} from "../main/mainActions";

export const setCurrentCafe = (data) => {
  return { type: SET_CURRENT_CAFE, data };
};
const setCafeList = (data) => {
  return { type: SET_CAFE_LIST, data };
};

export const getCafeList = () => {
  return async (dispatch) => {
    dispatch(fetchRequest());
    try {
      const response = await axiosOrder.get("/cafe");
      dispatch(setCafeList(response.data));
      dispatch(fetchSuccess());
    } catch (e) {
      dispatch(fetchError(e));
    }
  };
};
