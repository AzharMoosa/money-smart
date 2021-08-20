import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer,
  userUpdateDetailsReducer,
  userDeleteReducer,
} from "./reducers/userReducers";
import {
  savingDetailsReducer,
  savingCreateReducer,
  savingDeleteReducer,
  savingDeleteAllReducer,
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
import { reducer as burgerMenu } from "redux-burger-menu";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userUpdateDetails: userUpdateDetailsReducer,
  userDelete: userDeleteReducer,
  savingDetails: savingDetailsReducer,
  savingCreate: savingCreateReducer,
  savingDelete: savingDeleteReducer,
  savingDeleteAll: savingDeleteAllReducer,
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
  burgerMenu,
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
