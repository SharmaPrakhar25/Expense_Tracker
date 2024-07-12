// src/sagas.js
import { all } from 'redux-saga/effects';
import { watchAddExpense } from './AddExpenseSaga';
import { watchGetExpense } from './GetExpenseSaga';

export default function* rootSaga() {
  yield all([watchAddExpense(), watchGetExpense()]);
}
