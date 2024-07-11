// src/store/reducers.js
import { combineReducers } from '@reduxjs/toolkit';
import AddExpenseReducer from './AddExpenseSlice';

const rootReducer = combineReducers({
  AddExpense: AddExpenseReducer,
});

export default rootReducer;
