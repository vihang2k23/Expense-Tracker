import React, { useState } from "react";
import moment from "moment";
import { useDispatch } from 'react-redux';  
import { addObject } from '../state/store';
import { useNavigate } from 'react-router-dom';
import notify from './Notify.js';
import 'react-toastify/dist/ReactToastify.css';

const ExpenseForm = () => {
  const [entryType, setEntryType] = useState('exp');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [description, setDescription] = useState('');
  const [entryDate, setEntryDate] = useState(moment().format('YYYY-MM-DD'));
  const [entryAmount, setEntryAmount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const entryTypeChange = (e) => {
    setEntryType(e.target.value);
  };

  const changePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };

  const changeDescription = (e) => {
    setDescription(e.target.value);
  };

  const changeEntryDate = (e) => {
    setEntryDate(e.target.value);
  };

  const changeEntryAmount = (e) => {
    setEntryAmount(e.target.value);
  };

  const handleFocus = (event) => {
    if (entryAmount === 0) {
      event.target.select();
    }
  };

  const clearAllInputs = () => {
    setEntryType("exp");
    setPaymentMethod("Cash");
    setDescription("");
    setEntryDate(moment().format('YYYY-MM-DD'));
    setEntryAmount(0);
  };

  const submitForm = () => {
    let allData = {
      type: entryType,
      payment_type: paymentMethod,
      description: description,
      entry_date: entryDate,
      amount: entryAmount,
    };

    fetch("http://localhost:3000/Data", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(allData),
    })
    .then((response) => response.json())
    .then((result) => {
      dispatch(addObject(result)); // Dispatch the result with the id
      clearAllInputs();
      notify.success('Transaction added successfully!');
      navigate('/')
    })
    .catch((error) => {
      notify.error('Error adding transaction!');
      console.log("error", error);
    });
  };

  return (
    <div className="expense-form-card">
    
      <h2>Add Transaction</h2>

      <div className="select-type-section d-flex justify-content-around">
        <div className="form-check">
          <input
            className="form-check-input income-input"
            type="radio"
            name="flexRadioDefault"
            value='inc'
            onChange={entryTypeChange}
            checked={entryType === 'inc'}
            id="flexRadioDefault1"
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Income
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input expense-input"
            type="radio"
            value='exp'
            onChange={entryTypeChange}
            checked={entryType === 'exp'}
            name="flexRadioDefault"
            id="flexRadioDefault2"
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Expense
          </label>
        </div>
      </div>

      <div className="expense-income-form">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Select Type
          </label>
          <select className="form-select" aria-label="Default select example" onChange={changePaymentMethod}>
            <option value="Cash">Cash</option>
            <option value="Bank Account">Bank Account</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="UPI">UPI</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Add Description
          </label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={changeDescription}
            placeholder="Add Description"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Select Date
          </label>
          <input type="date" className="form-control" value={entryDate} onChange={changeEntryDate} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Add Amount
          </label>
          <input
            type="Number"
            value={entryAmount}
            onChange={changeEntryAmount}
            onFocus={handleFocus}
            className="form-control"
            placeholder="Add Amount"
          />
        </div>
        <button onClick={submitForm} disabled={!entryAmount || !description || !entryDate} type="button" className={`btn ${entryType === 'exp' ? 'btn-danger' : 'btn-success'} w-100`}>
          {entryType === 'exp' ? 'Add Expense' : 'Add Income'}
        </button>
      </div>
    </div>
  );
};

export default ExpenseForm;
