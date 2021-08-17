import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer,
  userDeleteReducer,
} from "./reducers/userReducers";
import {
  savingDetailsReducer,
  savingCreateReducer,
  savingDeleteReducer,
  savingUpdateReducer,
  savingAddAmountReducer,
  userSavingsListReducer,
} from "./reducers/savingReducer";

import {
  transactionDetailsReducer,
  transactionCreateReducer,
  transactionDeleteReducer,
  transactionUpdateReducer,
  userTransactionsListReducer,
} from "./reducers/transactionReducer";

import {
  receiptDetailsReducer,
  receiptCreateReducer,
  receiptDeleteReducer,
  receiptUpdateReducer,
  userReceiptsListReducer,
} from "./reducers/receiptReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  savingDetails: savingDetailsReducer,
  savingCreate: savingCreateReducer,
  savingDelete: savingDeleteReducer,
  savingUpdate: savingUpdateReducer,
  savingAddAmount: savingAddAmountReducer,
  userSavingsList: userSavingsListReducer,
  transactionDetails: transactionDetailsReducer,
  transactionCreate: transactionCreateReducer,
  transactionDelete: transactionDeleteReducer,
  transactionUpdate: transactionUpdateReducer,
  userTransactionsList: userTransactionsListReducer,
  receiptDetails: receiptDetailsReducer,
  receiptCreate: receiptCreateReducer,
  receiptDelete: receiptDeleteReducer,
  receiptUpdate: receiptUpdateReducer,
  userReceiptsList: userReceiptsListReducer,
});

const usersInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: usersInfoFromStorage },
  userRegister: { userInfo: usersInfoFromStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
