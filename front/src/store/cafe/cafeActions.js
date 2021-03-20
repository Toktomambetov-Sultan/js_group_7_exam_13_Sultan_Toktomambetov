import axiosOrder from "../../axiosOrder";
import {
  CLEAR_CAFE_LIST,
  CLEAR_CURRENT_CAFE,
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
export const clearCafeList = () => {
  return { type: CLEAR_CAFE_LIST };
};
const clearCurrentCafe = () => {
  return { type: CLEAR_CURRENT_CAFE };
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

export const postCurrentCafe = (data) => {
  return async (dispatch) => {
    dispatch(fetchRequest());
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    try {
      const response = await axiosOrder.post(
        "/cafe",
        formData
      );
      dispatch(clearCurrentCafe());
      dispatch(fetchSuccess());
    } catch (e) {
      dispatch(fetchError(e.response.data.errors));
    }
  };
};
