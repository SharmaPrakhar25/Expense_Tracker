import { createSlice } from '@reduxjs/toolkit';

export const AddExpenseSlice = createSlice({

  name: 'AddExpense',
  initialState: {
    data: null,
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
      data: action.payload,
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
