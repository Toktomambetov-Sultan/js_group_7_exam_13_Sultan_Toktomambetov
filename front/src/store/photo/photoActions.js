import { push } from "connected-react-router";
import axiosOrder from "../../axiosOrder";
import {
  SET_CURRENT_PHOTO,
  SET_PHOTOS,
} from "../actionsTypes";
import { setCurrentCafe } from "../cafe/cafeActions";
import {
  fetchError,
  fetchRequest,
  fetchSuccess,
} from "../main/mainActions";

export const setCurrentPhoto = (data) => {
  return { type: SET_CURRENT_PHOTO, data };
};
const setPhotos = (data) => {
  return { type: SET_PHOTOS, data };
};

export const getPhotos = (id) => {
  return async (dispatch) => {
    dispatch(fetchRequest());
    try {
      const response = await axiosOrder.get(
        `/photos/${id}`
      );
      dispatch(setPhotos(response.data));
      dispatch(fetchSuccess());
    } catch (e) {
      dispatch(fetchError(e.response.data.errors));
    }
  };
};

export const postPhoto = ({ data, id }) => {
  return async (dispatch) => {
    dispatch(fetchRequest());
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      await axiosOrder.post(`/photos/${id}`, formData);
      const response = await axiosOrder.get(`/cafe/${id}`);
      dispatch(setCurrentCafe(response.data));
      const photoResponse = await axiosOrder.get(
        `/photos/${id}`
      );
      dispatch(setPhotos(photoResponse.data));
      dispatch(fetchSuccess());
      dispatch(push(`/cafe-list/${id}`));
    } catch (e) {
      dispatch(fetchError(e.response.data.errors));
    }
  };
};

export const deletePhoto = ({ id, cafeId }) => {
  return async (dispatch) => {
    dispatch(fetchRequest());
    try {
      await axiosOrder.delete(`/photos/${id}`);
      const response = await axiosOrder.get(
        `/cafe/${cafeId}`
      );
      dispatch(setCurrentCafe(response.data));
      const photoResponse = await axiosOrder.get(
        `/photos/${cafeId}`
      );
      dispatch(setPhotos(photoResponse.data));
      dispatch(fetchSuccess());
      dispatch(push(`/cafe-list/${cafeId}`));
    } catch (e) {
      dispatch(fetchError(e.response.data.errors));
    }
  };
};
