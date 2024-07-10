import React from 'react';
import AddExpense from '../components/AddExpense';
import ExpenseTable from '../components/ExpenseTable';
import DoughnutChart from '../components/DoughnutChart';

function Mainpage() {
  return (
    <div className="w-full flex justify-center">
      <div className=" w-full flex justify-center flex-col md:flex-row-reverse md:w-3/4">
        {/* Right side (Form) */}

        <div className="w-full md:w-2/6 p-4 order-1 md:order-2">
          <AddExpense />
        </div>

        {/* Left side (Table) */}
        <div className="w-full md:w-4/6 p-4 order-2 md:order-1">
          <ExpenseTable />

          <div className="flex justify-center">
            <DoughnutChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
