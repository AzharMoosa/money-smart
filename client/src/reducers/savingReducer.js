import {
  SAVING_ADD_AMOUNT_FAIL,
  SAVING_ADD_AMOUNT_REQUEST,
  SAVING_ADD_AMOUNT_RESET,
  SAVING_ADD_AMOUNT_SUCCESS,
  SAVING_CREATE_FAIL,
  SAVING_CREATE_REQUEST,
  SAVING_CREATE_RESET,
  SAVING_CREATE_SUCCESS,
  SAVING_DELETE_FAIL,
  SAVING_DELETE_REQUEST,
  SAVING_DELETE_RESET,
  SAVING_DELETE_SUCCESS,
  SAVING_GET_FAIL,
  SAVING_GET_REQUEST,
  SAVING_GET_SUCCESS,
  SAVING_UPDATE_FAIL,
  SAVING_UPDATE_REQUEST,
  SAVING_UPDATE_RESET,
  SAVING_UPDATE_SUCCESS,
  USER_SAVINGS_FAIL,
  USER_SAVINGS_GET_REQUEST,
  USER_SAVINGS_SUCCESS,
} from "../constants/savingConstants";

export const savingDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVING_GET_REQUEST:
      return {
        loading: true,
      };
    case SAVING_GET_SUCCESS:
      return {
        loading: false,
        saving: action.payload,
      };
    case SAVING_GET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userSavingsListReducer = (state = { savings: [] }, action) => {
  switch (action.type) {
    case USER_SAVINGS_GET_REQUEST:
      return {
        loading: true,
        savings: [],
      };
    case USER_SAVINGS_SUCCESS:
      return {
        loading: false,
        savings: action.payload,
      };
    case USER_SAVINGS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const savingCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVING_CREATE_REQUEST:
      return {
        loading: true,
      };
    case SAVING_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        saving: action.payload,
      };
    case SAVING_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SAVING_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const savingUpdateReducer = (state = { saving: {} }, action) => {
  switch (action.type) {
    case SAVING_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case SAVING_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        saving: action.payload,
      };
    case SAVING_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SAVING_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const savingDeleteReducer = (state = { saving: {} }, action) => {
  switch (action.type) {
    case SAVING_DELETE_REQUEST:
      return {
        loading: true,
      };
    case SAVING_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case SAVING_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SAVING_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const savingAddAmountReducer = (state = { saving: {} }, action) => {
  switch (action.type) {
    case SAVING_ADD_AMOUNT_REQUEST:
      return {
        loading: true,
      };
    case SAVING_ADD_AMOUNT_SUCCESS:
      return {
        loading: false,
        success: true,
        saving: action.payload,
      };
    case SAVING_ADD_AMOUNT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SAVING_ADD_AMOUNT_RESET:
      return {};
    default:
      return state;
  }
};
