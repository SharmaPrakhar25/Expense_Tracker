import React from 'react';
import AddExpense from '../components/AddExpense';
import Tabs from '../components/Tabs';

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
          <Tabs />
        </div>
      </div>
    </div>
  );
}

export default Mainpage;
