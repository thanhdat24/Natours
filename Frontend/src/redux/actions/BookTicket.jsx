import bookingApi from "../../api/bookingApi";
import {
  CREATE_SHOWTIME_FAIL,
  CREATE_SHOWTIME_REQUEST,
  CREATE_SHOWTIME_SUCCESS,
  DELETE_SHOWTIME_FAIL,
  DELETE_SHOWTIME_REQUEST,
  DELETE_SHOWTIME_SUCCESS,
  GET_SHOWTIME_FAIL,
  GET_SHOWTIME_REQUEST,
  GET_SHOWTIME_SUCCESS,
  RESET_CREATE_SHOWTIME,
  UPDATE_SHOWTIME_REQUEST,
  UPDATE_SHOWTIME_SUCCESS,
  UPDATE_SHOWTIME_FAIL,
} from "../constants/BookTicket";

export const createShowtime = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_SHOWTIME_REQUEST,
      });
      const result = await bookingApi.postCreateShowTimes(data);
      dispatch({
        type: CREATE_SHOWTIME_SUCCESS,
        payload: {
          data: result.data,
        },
      });
    } catch (error) {
      dispatch({
        type: CREATE_SHOWTIME_FAIL,
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const deleteShowTimes = (_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_SHOWTIME_REQUEST,
      });
      const result = await bookingApi.deleteShowTimes(_id);
      dispatch({
        type: DELETE_SHOWTIME_SUCCESS,
        payload: {
          data: result.data.data,
        },
      });
    } catch (error) {
      dispatch({
        type: DELETE_SHOWTIME_FAIL,
        payload: {
          error: error.response?.data.message,
        },
      });
    }
  };
};

export const getDetailShowtimes = (_id) => {
  return (dispatch) => {
    dispatch({
      type: GET_SHOWTIME_REQUEST,
    });
    bookingApi
      .getDetailShowtimes(_id)
      .then((result) => {
        dispatch({
          type: GET_SHOWTIME_SUCCESS,
          payload: {
            data: result.data.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_SHOWTIME_FAIL,
          payload: {
            error: error.response?.data.message,
          },
        });
      });
  };
};

export const updateShowtime = (_id, showtime) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_SHOWTIME_REQUEST,
    });
    bookingApi
      .updateShowtimes(_id, showtime)
      .then((result) => {
        console.log("result", result);
        dispatch({
          type: UPDATE_SHOWTIME_SUCCESS,
          payload: {
            data: result.data.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_SHOWTIME_FAIL,
          payload: {
            error: error.response?.data.message,
          },
        });
      });
  };
};

export const resetCreateShowtime = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_CREATE_SHOWTIME,
    });
  };
};