import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import DoughnutChart from './DoughnutChart';

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
        'http://localhost:8080/expense/add',
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
    <div className="flex  ">
      {/* Left side (Table) */}
      <div className="w-4/6 p-4">
     
        <h2 className="text-lg font-bold mb-4">Expense List</h2>
        {/* Example table (replace with your own table component or data) */}
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Date</th>
              <th className="border border-gray-200 px-4 py-2">Category</th>
              <th className="border border-gray-200 px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {/* Example table row (replace with dynamic data) */}
            <tr className="border-b border-gray-200">
              <td className="border border-gray-200 px-4 py-2">2023-01-01</td>
              <td className="border border-gray-200 px-4 py-2">Food</td>
              <td className="border border-gray-200 px-4 py-2">$10.00</td>
            </tr>
          </tbody>
        </table>

        <div className='flex justify-center'>
        <DoughnutChart />
        </div>
      </div>

      {/* Right side (Form) */}
      <div className="w-2/6 p-4">
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
       
      
      </div>
    </div>
  );
}

export default AddExpense;
