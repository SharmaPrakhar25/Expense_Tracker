/* eslint-disable no-param-reassign */
 // eslint-disable-next-line quotes
 import { createSlice } from "@reduxjs/toolkit";

export const AddExpenseSlice = createSlice({
  // eslint-disable-next-line quotes, linebreak-style
  name: "AddExpense",
  // eslint-disable-next-line linebreak-style
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    isAddExpenseSuccess: false,
  },
  reducers: {
    AddExpenseRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.isAddExpenseSuccess = false;
// eslint-disable-next-line linebreak-style

    },
    AddExpenseSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAddExpenseSuccess = true;
    },
    AddExpenseFailure: (state, action) => {
      state.isLoading = false;
      // eslint-disable-next-line linebreak-style
      state.error = action.payload;
      // eslint-disable-next-line linebreak-style
      state.isAddExpenseSuccess = false;
    },
  },
});

export const { AddExpenseRequest, AddExpenseSuccess, AddExpenseFailure } =
  AddExpenseSlice.actions;

export default AddExpenseSlice.reducer;
