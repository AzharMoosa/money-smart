import {
  RECEIPT_CREATE_FAIL,
  RECEIPT_CREATE_REQUEST,
  RECEIPT_CREATE_RESET,
  RECEIPT_CREATE_SUCCESS,
  RECEIPT_DELETE_FAIL,
  RECEIPT_DELETE_REQUEST,
  RECEIPT_DELETE_RESET,
  RECEIPT_DELETE_SUCCESS,
  RECEIPT_GET_FAIL,
  RECEIPT_GET_REQUEST,
  RECEIPT_GET_SUCCESS,
  RECEIPT_UPDATE_FAIL,
  RECEIPT_UPDATE_REQUEST,
  RECEIPT_UPDATE_RESET,
  RECEIPT_UPDATE_SUCCESS,
  USER_RECEIPTS_FAIL,
  USER_RECEIPTS_GET_REQUEST,
  USER_RECEIPTS_SUCCESS,
} from "../constants/receiptConstants";

export const receiptDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIPT_GET_REQUEST:
      return {
        loading: true,
      };
    case RECEIPT_GET_SUCCESS:
      return {
        loading: false,
        receipt: action.payload,
      };
    case RECEIPT_GET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userReceiptsListReducer = (state = { receipts: [] }, action) => {
  switch (action.type) {
    case USER_RECEIPTS_GET_REQUEST:
      return {
        loading: true,
        receipts: [],
      };
    case USER_RECEIPTS_SUCCESS:
      return {
        loading: false,
        receipts: action.payload.receipts,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case USER_RECEIPTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const receiptCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIPT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case RECEIPT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        receipt: action.payload,
      };
    case RECEIPT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case RECEIPT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const receiptUpdateReducer = (state = { receipt: {} }, action) => {
  switch (action.type) {
    case RECEIPT_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case RECEIPT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        receipt: action.payload,
      };
    case RECEIPT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case RECEIPT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const receiptDeleteReducer = (state = { receipt: {} }, action) => {
  switch (action.type) {
    case RECEIPT_DELETE_REQUEST:
      return {
        loading: true,
      };
    case RECEIPT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case RECEIPT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case RECEIPT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
