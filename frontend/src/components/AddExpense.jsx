/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { AddExpenseRequest } from '../redux/Reducers/AddExpenseSlice'; // Update the path to your slice file

function AddExpense() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(AddExpenseRequest({
      user_id: 1,
      category,
      amount: parseInt(price, 10),
      date: date ? date.toISOString().split('T')[0] : null,
      is_shared: false,
    }));
  };

  return (
    <>
      <h2 className="text-lg font-bold mb-4">Add Expense</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            id="category"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700" htmlFor="price">
            Price
          </label>
          <input
            type="text"
            id="price"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="MM/dd/yyyy"
            customInput={(
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Date"
              />
            )}
          />
        </div>
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
