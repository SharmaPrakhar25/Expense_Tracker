import React from 'react';
import { ToastContainer } from 'react-toastify';
import Mainpage from './pages/Mainpage';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <Mainpage />

    </div>
  );
}

export default App;
