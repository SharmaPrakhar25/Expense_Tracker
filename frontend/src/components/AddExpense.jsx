import React, { useState, useCallback, memo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { AddExpenseRequest } from '../redux/Reducers/AddExpenseSlice';

const MemoizedInput = memo(({
  id, label, placeholder, value, onChange,
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
));

const MemoizedButton = memo(({
  type, className, onClick, children,
}) => (
  <button
    type={type}
    className={className}
    onClick={onClick}
  >
    {children}
  </button>
));

const MemoizedDatePicker = memo(({ selected, onChange }) => (
  <DatePicker
    selected={selected}
    onChange={onChange}
    dateFormat="MM/dd/yyyy"
    customInput={(
      <input
        type="text"
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Date"
      />
    )}
  />
));

const formatDate = (date) => {
  if (!date) return null;
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().split('T')[0];
};

function AddExpense() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(null);
  const [showShareFields, setShowShareFields] = useState(false);
  const [friendId, setFriendId] = useState('');
  const [shareAmount, setShareAmount] = useState('');

  const handleSubmit = useCallback(() => {
    const expense = {
      user_id: 1,
      category,
      amount: parseInt(price, 10),
      created_at: date ? formatDate(date) : '',
      is_shared: showShareFields,
    };

    if (showShareFields) {
      expense.user_expense = [
        {
          user_id: parseInt(friendId, 10),
          shared_amount: parseInt(shareAmount, 10),
        },
      ];
    }

    dispatch(AddExpenseRequest(expense));
  }, [category, price, date, showShareFields, friendId, shareAmount, dispatch]);

  const handleCategoryChange = useCallback((e) => setCategory(e.target.value), []);
  const handlePriceChange = useCallback((e) => setPrice(e.target.value), []);
  const handleDateChange = useCallback((date) => setDate(date), []);
  const toggleShareFields = useCallback(() => {
    setShowShareFields((prevShowShareFields) => !prevShowShareFields);
  }, []);

  const handleFriendIdChange = useCallback((e) => setFriendId(e.target.value), []);
  const handleShareAmountChange = useCallback((e) => setShareAmount(e.target.value), []);

  return (
    <>
      <h2 className="text-lg font-bold mb-4">Add Expense</h2>
      <div className="grid gap-4">
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
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <MemoizedDatePicker selected={date} onChange={handleDateChange} />
        </div>

        <div className="mb-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={showShareFields}
              onChange={toggleShareFields}
            />
            <span className="ml-2 text-sm text-gray-700">Share</span>
          </label>
        </div>

        {showShareFields && (
          <>
            <MemoizedInput
              id="friendId"
              label="Friend ID"
              placeholder="Friend ID"
              value={friendId}
              onChange={handleFriendIdChange}
            />
            <MemoizedInput
              id="shareAmount"
              label="Share Amount"
              placeholder="Share Amount"
              value={shareAmount}
              onChange={handleShareAmountChange}
            />
          </>
        )}

        <div>
          <MemoizedButton
            type="button"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleSubmit}
          >
            Submit
          </MemoizedButton>
        </div>
      </div>
    </>
  );
}

export default memo(AddExpense);
