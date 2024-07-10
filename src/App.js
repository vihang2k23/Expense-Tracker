import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadInitialData } from './state/store';
import Navbar from './components/Navbar';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import './App.css'; // Ensure this imports your CSS
import { ToastContainer } from 'react-toastify';
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:3000/Data')
      .then(response => response.json())
      .then(data => {
        dispatch(loadInitialData(data));
      })
      .catch(error => console.log('error', error));
  }, [dispatch]);

  return (
   <div>
 <ToastContainer/>
    <Router>
      <div>
        <Navbar />
        <div className="container text-center content-container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 mt-5">
              <Routes>
                <Route path="/" element={<ExpenseList />} />
                <Route path="/expense-form" element={<ExpenseForm />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>

   </div>
  );
};

export default App;
