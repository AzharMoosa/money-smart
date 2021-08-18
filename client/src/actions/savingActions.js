import {
  SAVING_ADD_AMOUNT_FAIL,
  SAVING_ADD_AMOUNT_REQUEST,
  SAVING_ADD_AMOUNT_SUCCESS,
  SAVING_CREATE_FAIL,
  SAVING_CREATE_REQUEST,
  SAVING_CREATE_SUCCESS,
  SAVING_DELETE_ALL_FAIL,
  SAVING_DELETE_ALL_REQUEST,
  SAVING_DELETE_ALL_SUCCESS,
  SAVING_DELETE_FAIL,
  SAVING_DELETE_REQUEST,
  SAVING_DELETE_SUCCESS,
  SAVING_GET_FAIL,
  SAVING_GET_REQUEST,
  SAVING_GET_SUCCESS,
  SAVING_UPDATE_FAIL,
  SAVING_UPDATE_REQUEST,
  SAVING_UPDATE_SUCCESS,
  USER_SAVINGS_FAIL,
  USER_SAVINGS_GET_REQUEST,
  USER_SAVINGS_SUCCESS,
} from "../constants/savingConstants";
import axios from "axios";

export const getSavings =
  (keyword = "", pageNumber = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_SAVINGS_GET_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/savings?keyword=${keyword}&pageNumber=${pageNumber}`,
        config
      );

      dispatch({
        type: USER_SAVINGS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_SAVINGS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getSaving = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SAVING_GET_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/savings/${id}`, config);

    dispatch({
      type: SAVING_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SAVING_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSaving =
  (name, amountRequired, description, deadline) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: SAVING_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/savings`,
        { name, amountRequired, description, deadline },
        config
      );

      dispatch({
        type: SAVING_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SAVING_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateSaving = (saving) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SAVING_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/savings/${saving._id}`,
      saving,
      config
    );

    dispatch({
      type: SAVING_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SAVING_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addAmountToSaving =
  (amount, date, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SAVING_ADD_AMOUNT_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/savings/add/${id}`,
        { amount, date },
        config
      );

      dispatch({
        type: SAVING_ADD_AMOUNT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SAVING_ADD_AMOUNT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteSaving = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SAVING_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/savings/${id}`, config);

    dispatch({
      type: SAVING_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SAVING_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteAllSaving = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SAVING_DELETE_ALL_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/savings`, config);

    dispatch({
      type: SAVING_DELETE_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SAVING_DELETE_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
