import { createSlice } from '@reduxjs/toolkit';

export const GetExpenseSlice = createSlice({
  name: 'GetExpense',
  initialState: {
    expense: [],
    isLoading: false,
    error: null,
    isGetExpenseSuccess: false,
  },
  reducers: {
    GetExpenseRequest: (state) => ({
      isLoading: true,
      error: null,
      isGetExpenseSuccess: false,
    }),
    GetExpenseSuccess: (state, action) => ({
      isLoading: false,
      expense: action.payload, // Corrected this line
      isGetExpenseSuccess: true,
    }),
    GetExpenseFailure: (state, action) => ({
      isLoading: false,
      error: action.payload,
      isGetExpenseSuccess: false,
    }),
  },
});

export const { GetExpenseRequest, GetExpenseSuccess, GetExpenseFailure } = GetExpenseSlice.actions;

export default GetExpenseSlice.reducer;
