/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Mainpage from './pages/Mainpage';
import 'react-toastify/dist/ReactToastify.css';
import { GetExpenseRequest } from './redux/Reducers/GetExpenseSlice';

function App() {
  const { expense = [] } = useSelector((state) => state.GetExpense);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetExpenseRequest());
  }, [dispatch]);

  // Calculate total amount of expenses
  const totalAmount = expense.reduce((total, e) => total + e.total_amount, 0);

  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="w-5/6 flex justify-center bg-lime-200 rounded-full">
          <h1 className="font-mono italic">Expenses</h1>
        </div>
      </div>
      <ToastContainer />
      <Mainpage />

      <div className="w-full fixed bottom-10 py-2">
        <div className="w-5/6 mx-auto flex justify-center bg-lime-200 rounded-full">
          <h1 className="font-mono italic">Total Expenses: ${totalAmount}</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
