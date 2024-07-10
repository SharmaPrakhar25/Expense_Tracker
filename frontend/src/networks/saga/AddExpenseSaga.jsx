/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line quotes
import { takeLatest, call, put } from "redux-saga/effects";
 // Assuming you have a OtpSlice with appropriate action creators
import { AddExpense_API } from "../index"; // Assuming you have a otpAPI function to make the otp request
// eslint-disable-next-line quotes
import { AddExpenseFailure, AddExpenseSuccess  } from "../../redux/Reducers/AddExpenseSlice";

function* handleAddExpense(action) {
  try {
    const user = yield call(AddExpense_API, action.payload);
    // Dispatch the otpSuccess action with the user data
    yield put(AddExpenseSuccess(user.data));
    if (!user.error) {
      yield put(AddExpenseSuccess(user));
    } else {
      yield put(AddExpenseFailure(user.error));
    }
  } catch (error) {
    // Dispatch the otpFailure action with the error message
    yield put(AddExpenseFailure(error.message));
  }
}

// Watcher saga to listen for login requests
export function* watchAddExpense() {
  // Take the latest login request action and call handleLogin saga
  // eslint-disable-next-line quotes
  yield takeLatest("AddExpense/AddExpenseRequest", handleAddExpense);
}
