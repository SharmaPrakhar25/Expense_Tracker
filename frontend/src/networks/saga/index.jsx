// src/sagas.js
import { all } from "redux-saga/effects";
import { watchAddExpense } from "./AddExpenseSaga";
 
export default function* rootSaga() {
  yield all([
    watchAddExpense(),
  ]);
}
