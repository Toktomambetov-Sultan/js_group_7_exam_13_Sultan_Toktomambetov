import axiosOrder from "../../axiosOrder";
import {
  SET_CURRENT_REVIEW,
  SET_REVIEWS,
} from "../actionsTypes";
import { fetchRequest } from "../main/mainActions";

export const setCurrentReview = (data) => {
  return { type: SET_CURRENT_REVIEW, data };
};
export const setReviews = (data) => {
  return { type: SET_REVIEWS, data };
};

export const getReviews = (id) => {
  return async (dispatch) => {
    dispatch(fetchRequest());
    try {
      const response = await axiosOrder.get(`/reviews/${id}`);
      
      dispatch(fetchError());   
    } catch (e) {
      
    }
  };
};
