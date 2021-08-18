import {
  RECEIPT_CREATE_FAIL,
  RECEIPT_CREATE_REQUEST,
  RECEIPT_CREATE_SUCCESS,
  RECEIPT_DELETE_FAIL,
  RECEIPT_DELETE_REQUEST,
  RECEIPT_DELETE_SUCCESS,
  RECEIPT_GET_FAIL,
  RECEIPT_GET_REQUEST,
  RECEIPT_GET_SUCCESS,
  RECEIPT_UPDATE_FAIL,
  RECEIPT_UPDATE_REQUEST,
  RECEIPT_UPDATE_SUCCESS,
  USER_RECEIPTS_FAIL,
  USER_RECEIPTS_GET_REQUEST,
  USER_RECEIPTS_SUCCESS,
} from "../constants/receiptConstants";

import axios from "axios";

export const getReceipts =
  (pageNumber = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_RECEIPTS_GET_REQUEST,
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
        `/api/receipts?pageNumber=${pageNumber}`,
        config
      );

      dispatch({
        type: USER_RECEIPTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_RECEIPTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getReceipt = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RECEIPT_GET_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/receipts/${id}`, config);

    dispatch({
      type: RECEIPT_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RECEIPT_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createReceipt =
  (name, type, amount, date, image) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RECEIPT_CREATE_REQUEST,
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
        `/api/receipts`,
        { name, type, amount, date, image },
        config
      );

      dispatch({
        type: RECEIPT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: RECEIPT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateReceipt = (receipt) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RECEIPT_UPDATE_REQUEST,
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
      `/api/receipts/${receipt._id}`,
      receipt,
      config
    );

    dispatch({
      type: RECEIPT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RECEIPT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteReceipt = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: RECEIPT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/receipts`, config);

    dispatch({
      type: RECEIPT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RECEIPT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
