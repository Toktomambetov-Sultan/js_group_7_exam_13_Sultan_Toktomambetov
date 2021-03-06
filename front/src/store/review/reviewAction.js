import axiosOrder from "../../axiosOrder";
import {
  CLEAR_CURRENT_REVIEW,
  CLEAR_REVIEWS,
  SET_CURRENT_REVIEW,
  SET_REVIEWS,
} from "../actionsTypes";
import { setCurrentCafe } from "../cafe/cafeActions";
import {
  fetchError,
  fetchRequest,
  fetchSuccess,
} from "../main/mainActions";

export const setCurrentReview = (data) => {
  return { type: SET_CURRENT_REVIEW, data };
};
export const setReviews = (data) => {
  return { type: SET_REVIEWS, data };
};
export const clearCurrentReview = () => {
  return { type: CLEAR_CURRENT_REVIEW };
};

export const clearReviews = () => {
  return { type: CLEAR_REVIEWS };
};

export const getReviews = (id) => {
  return async (dispatch) => {
    dispatch(fetchRequest());
    try {
      const response = await axiosOrder.get(
        `/reviews/${id}`
      );
      dispatch(setReviews(response.data));
      dispatch(fetchSuccess());
    } catch (e) {
      console.log(e);
      dispatch(fetchError(e.response?.data.errors));
    }
  };
};

export const postReview = ({ id, data }) => {
  return async (dispatch) => {
    dispatch(fetchError);
    try {
      await axiosOrder.post(`/reviews/${id}`, data);
      const response = await axiosOrder.get(
        `/reviews/${id}`
      );
      dispatch(setReviews(response.data));
      const cafeResponse = await axiosOrder.get(
        `/cafe/${id}`
      );
      dispatch(setCurrentCafe(cafeResponse.data));
      dispatch(fetchSuccess());
    } catch (e) {
      dispatch(fetchError(e.response.data.errors));
    }
  };
};

export const deleteReview = ({ id, cafeId }) => {
  return async (dispatch) => {
    dispatch(fetchError);
    try {
      await axiosOrder.delete(`/reviews/${id}`);
      const response = await axiosOrder.get(
        `/reviews/${cafeId}`
      );
      dispatch(setReviews(response.data));
      const cafeResponse = await axiosOrder.get(
        `/cafe/${cafeId}`
      );
      dispatch(setCurrentCafe(cafeResponse.data));
      dispatch(fetchSuccess());
    } catch (e) {
      dispatch(fetchError(e.response.data.errors));
    }
  };
};
