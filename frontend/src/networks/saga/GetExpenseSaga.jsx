import { takeLatest, call, put } from 'redux-saga/effects';
import {
  GetExpenseSuccess,
  GetExpenseFailure,
} from '../../redux/Reducers/GetExpenseSlice';
import { getExpenseAPI } from '..';

function* handleGetExpenseData(action) {
  try {
    const expense = yield call(getExpenseAPI, action.payload); // Pass payload to API call
    yield put(GetExpenseSuccess(expense.data));
  } catch (error) {
    yield put(GetExpenseFailure(error.message));
    console.error('Failed to get expenses:', error.message);
  }
}

export function* watchGetExpense() {
  yield takeLatest('GetExpense/GetExpenseRequest', handleGetExpenseData);
}
