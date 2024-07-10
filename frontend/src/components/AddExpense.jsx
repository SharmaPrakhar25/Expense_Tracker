import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';

function AddExpense() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expenseData = {
        user_id: 1,
        category,
        amount: parseInt(price, 10),
        // date: selectedDate ? selectedDate.toISOString().
        // split('T')[0] : null, // Format date to YYYY-MM-DD
        is_shared: false,
      };
      console.log(expenseData);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/expense/add`,
        expenseData,
      );

      console.log(response.data);
      toast.success(response.data.message);

      // Todo: show success message back in toast bar
    } catch (error) {
      console.error('Error adding expense:', error);
      toast.error(error.message);
      // Todo: show error message back in toast bar
    }
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
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
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
