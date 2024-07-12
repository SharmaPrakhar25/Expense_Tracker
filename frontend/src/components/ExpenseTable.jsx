import React, {
  useEffect, useState, useCallback, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetExpenseRequest } from '../redux/Reducers/GetExpenseSlice';

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

// Memoized Input Component
const MemoizedInput = React.memo(
  ({
    placeholder, value, onChange, 
   }) => {
   

    return (
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
         className="bg-none px-4 py-2 outline-none w-full"
      />
    );
  },
);

// Memoized Button Component
const MemoizedButton = React.memo(({ onClick, children }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center p-2 h-10 rounded-md"
  >
    {children}
  </button>
));

// ExpenseTable Component
const ExpenseTable = React.memo(() => {
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [dateSortOrder, setDateSortOrder] = useState('asc');
  const dispatch = useDispatch();

  const { expense, isLoading, error } = useSelector(
    (state) => state.GetExpense,
  );

  useEffect(() => {
    dispatch(GetExpenseRequest());
  }, [dispatch]);

  const handleSearchData = useCallback(() => {
    dispatch(GetExpenseRequest(`category=${category}`));
  }, [category, dispatch]);

  const handleSortByCategory = useCallback(() => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    dispatch(GetExpenseRequest(`sort_by=category&sort_type=${newSortOrder}`));
  }, [sortOrder, dispatch]);

  const handleSortByDate = useCallback(() => {
    const newDateSortOrder = dateSortOrder === 'asc' ? 'desc' : 'asc';
    setDateSortOrder(newDateSortOrder);
    dispatch(
      GetExpenseRequest(`sort_by=createdAt&sort_type=${newDateSortOrder}`),
    );
  }, [dateSortOrder, dispatch]);

  const renderedExpenses = useMemo(() => expense && expense.map((e) => (
    <tr key={e.id} className={e.id % 2 === 0 ? 'bg-white' : 'bg-lime-200'}>
      <td className="px-4 py-2">{formatDate(e.createdAt)}</td>
      <td className="px-4 py-2">{formatCategoryName(e.category)}</td>
      <td className="px-4 py-2">
        $
        {e.total_amount}
      </td>
    </tr>
  )), [expense]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2 className="text-lg font-bold mb-4">Expense List</h2>
      <div className="w-full mb-2 flex flex-col sm:flex-row items-center">
        <div className="flex items-center border border-gray-500 rounded-full h-10 overflow-hidden w-full sm:w-3/4 lg:w-1/2 mb-2 sm:mb-0">
          <MemoizedInput
            placeholder="Search By Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
           />
          <MemoizedButton onClick={handleSearchData}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </MemoizedButton>
        </div>
        <div className="flex space-x-2">
          <MemoizedButton onClick={handleSortByCategory}>
            Sort By Category
            {sortOrder === 'asc' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                />
              </svg>
            )}
          </MemoizedButton>
          <MemoizedButton onClick={handleSortByDate}>
            Sort By Date
            {dateSortOrder === 'asc' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                />
              </svg>
            )}
          </MemoizedButton>
        </div>
      </div>

      <div className="overflow-auto custom-scrollbar rounded-lg shadow-sm ">
        {expense.length > 0 ? (
          <table className="w-full table-auto border-collapse overflow-hidden">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
              </tr>
            </thead>
            <tbody>{renderedExpenses}</tbody>
          </table>
        ) : (
          <p>No expenses found.</p>
        )}
      </div>
    </>
  );
});

export default ExpenseTable;
