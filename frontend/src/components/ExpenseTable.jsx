import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const colors = [
  'bg-red-100',
  'bg-green-100',
  'bg-blue-100',
  'bg-yellow-100',
  'bg-purple-100',
  'bg-indigo-100',
  'bg-pink-100',
  // Add more colors as needed
];

// Function to generate random background colors
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

// Function to format category name
const formatCategoryName = (category) => {
  if (!category) return '';
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
};

// Function to format createdAt date to display month name
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

function ExpenseTable() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/expense/1/`);
        const { data: expenseData } = response.data;
        setExpenses(expenseData);
      } catch (error) {
        toast.error('Failed to fetch expenses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2 className="text-lg font-bold mb-4">Expense List</h2>
      <div className="max-h-48 overflow-auto custom-scrollbar">
        {expenses.length > 0 ? (
          <table className="w-full border-collapse rounded-lg border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2">Date</th>
                <th className="border border-gray-200 px-4 py-2">Category</th>
                <th className="border border-gray-200 px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length && expenses.map((expense) => (
                <tr key={expense.id} className={`border-b border-gray-200 ${getRandomColor()}`}>
                  <td className="border border-gray-200 px-4 py-2">{formatDate(expense.createdAt)}</td>
                  <td className="border border-gray-200 px-4 py-2">{formatCategoryName(expense.category)}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    $
                    {expense.total_amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No expenses found.</p>
        )}
      </div>
    </>
  );
}

export default ExpenseTable;
