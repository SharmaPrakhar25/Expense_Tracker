/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { AddExpenseRequest } from '../redux/Reducers/AddExpenseSlice'; // Update the path to your slice file
import { GetExpenseRequest } from '../redux/Reducers/GetExpenseSlice';

const MemoizedInput = React.memo(
  ({
    // eslint-disable-next-line react/prop-types
    id,
    label,
    placeholder,
    value,
    onChange,
  }) => (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
        {label}
      </label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  ),
);

function AddExpense() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Format date to local timezone date string
    const formatDate = (date) => {
      if (!date) return null;
      const offsetDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000,
      );
      return offsetDate.toISOString().split('T')[0];
    };

    dispatch(
      AddExpenseRequest({
        user_id: 1,
        category,
        amount: parseInt(price, 10),
        created_at: date ? formatDate(date) : '',
        is_shared: false,
      }),
    );
    dispatch(GetExpenseRequest());
  };

  const handleCategoryChange = useCallback(
    (e) => setCategory(e.target.value),
    [],
  );
  const handlePriceChange = useCallback((e) => setPrice(e.target.value), []);

  return (
    <>
      <h2 className="text-lg font-bold mb-4">Add Expense</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <MemoizedInput
          id="category"
          label="Category"
          placeholder="Category"
          value={category}
          onChange={handleCategoryChange}
        />
        <MemoizedInput
          id="price"
          label="Price"
          placeholder="Price"
          value={price}
          onChange={handlePriceChange}
        />
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="MM/dd/yyyy"
            customInput={
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Date"
              />
            }
          />
        </div>
        <div />
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default AddExpense;
