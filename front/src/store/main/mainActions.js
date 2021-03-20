import {
  CLEAR_ERRORS,
  FETCH_ERROR,
  FETCH_REQUEST,
  FETCH_SUCCESS,
} from "../actionsTypes";

export const fetchRequest = () => {
  return { type: FETCH_REQUEST };
};

export const fetchError = (error) => {
  return { type: FETCH_ERROR, error };
};

export const fetchSuccess = () => {
  return { type: FETCH_SUCCESS };
};

export const clearErrors = () => {
  return { type: CLEAR_ERRORS };
};
