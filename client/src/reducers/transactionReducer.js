import {
  TRANSACTION_CREATE_FAIL,
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_CREATE_RESET,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_DELETE_FAIL,
  TRANSACTION_DELETE_REQUEST,
  TRANSACTION_DELETE_RESET,
  TRANSACTION_DELETE_SUCCESS,
  TRANSACTION_GET_FAIL,
  TRANSACTION_GET_REQUEST,
  TRANSACTION_GET_SUCCESS,
  TRANSACTION_UPDATE_FAIL,
  TRANSACTION_UPDATE_REQUEST,
  TRANSACTION_UPDATE_RESET,
  TRANSACTION_UPDATE_SUCCESS,
  USER_TRANSACTIONS_FAIL,
  USER_TRANSACTIONS_GET_REQUEST,
  USER_TRANSACTIONS_SUCCESS,
} from "../constants/transactionConstants";

export const transactionDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_GET_REQUEST:
      return {
        loading: true,
      };
    case TRANSACTION_GET_SUCCESS:
      return {
        loading: false,
        transaction: action.payload,
      };
    case TRANSACTION_GET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userTransactionsListReducer = (
  state = { transactions: [] },
  action
) => {
  switch (action.type) {
    case USER_TRANSACTIONS_GET_REQUEST:
      return {
        loading: true,
        transactions: [],
      };
    case USER_TRANSACTIONS_SUCCESS:
      return {
        loading: false,
        transactions: action.payload,
      };
    case USER_TRANSACTIONS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const transactionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_CREATE_REQUEST:
      return {
        loading: true,
      };
    case TRANSACTION_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        transaction: action.payload,
      };
    case TRANSACTION_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TRANSACTION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const transactionUpdateReducer = (
  state = { transaction: {} },
  action
) => {
  switch (action.type) {
    case TRANSACTION_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case TRANSACTION_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        transaction: action.payload,
      };
    case TRANSACTION_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TRANSACTION_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const transactionDeleteReducer = (
  state = { transaction: {} },
  action
) => {
  switch (action.type) {
    case TRANSACTION_DELETE_REQUEST:
      return {
        loading: true,
      };
    case TRANSACTION_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        transaction: action.payload,
      };
    case TRANSACTION_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TRANSACTION_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
