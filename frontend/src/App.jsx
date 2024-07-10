import React from 'react';
import { ToastContainer } from 'react-toastify';
import Mainpage from './pages/Mainpage';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="w-5/6 flex justify-center bg-green-200 rounded-full">
          <h1 className="font-mono italic">Mera Karcha</h1>
        </div>
      </div>
      <ToastContainer />
      <Mainpage />
    </div>
  );
}

export default App;
