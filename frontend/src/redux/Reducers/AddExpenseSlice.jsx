import { createSlice } from '@reduxjs/toolkit';

export const AddExpenseSlice = createSlice({
  // eslint-disable-next-line quotes
  name: "AddExpense",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    isAddExpenseSuccess: false,
  },
  reducers: {
    AddExpenseRequest: () => ({
      isLoading: true,
      error: null,
      isAddExpenseSuccess: false,
    }),
    AddExpenseSuccess: (state, action) => ({
      isLoading: false,
      user: action.payload,
      isAddExpenseSuccess: true,
    }),
    AddExpenseFailure: (state, action) => ({
      isLoading: false,
      error: action.payload,
      isAddExpenseSuccess: false,
    }),
  },
});

export const { AddExpenseRequest, AddExpenseSuccess, AddExpenseFailure } = AddExpenseSlice.actions;

export default AddExpenseSlice.reducer;
