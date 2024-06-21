import logo from "./logo.svg";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { loadInitialData } from './state/store';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
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
    <div className="container text-center">
      <div className="row">
        <div className="col-4">
        <ExpenseForm />
        </div>
        <div className="col-8">
          <ExpenseList />
        </div>
      </div>
    </div>
  );
}

export default App;
