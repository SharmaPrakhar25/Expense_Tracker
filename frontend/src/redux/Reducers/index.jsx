// src/store/reducers.js
import { combineReducers } from '@reduxjs/toolkit';
import AddExpenseReducer from './AddExpenseSlice';
import GetExpenseReducser from './GetExpenseSlice';

const rootReducer = combineReducers({
  AddExpense: AddExpenseReducer,
  GetExpense: GetExpenseReducser,
});

export default rootReducer;
