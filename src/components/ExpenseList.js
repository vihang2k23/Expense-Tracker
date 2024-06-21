import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { deleteObject, updateObject } from '../state/store'; // Assuming these are your action creators

const ExpenseList = () => {
  const [entryList, setEntryList] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [editId, setEditId] = useState(null); // To keep track of the entry being edited
  const [editData, setEditData] = useState({});

  const objectsFromState = useSelector((state) => state.objects);
  const dispatch = useDispatch();

  useEffect(() => {
    setEntryList(objectsFromState);
    calculateTotals(objectsFromState);
  }, [objectsFromState]);

  const calculateTotals = (entries) => {
    const { income, expense } = entries.reduce(
      (acc, element) => {
        if (element.type === "inc") {
          acc.income += parseFloat(element.amount);
        } else {
          acc.expense += parseFloat(element.amount);
        }
        return acc;
      },
      { income: 0, expense: 0 }
    );
    setTotalIncome(income);
    setTotalExpense(expense);
  };

  const deleteData = (id) => {
    fetch(`http://localHost:3000/Data/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type':'application/json'
      }
    })
    .then(res => res.json())
    .then(() => {
      dispatch(deleteObject(id)); // Update the store with the id of the deleted object
    })
    .catch(error => console.error('Error deleting data:', error));
  };

  const startEdit = (entry) => {
    setEditId(entry.id);
    setEditData(entry);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    console.log('name, value: ', name, value);
    console.log('e.target: ', e.target);
    setEditData({ ...editData, [name]: value });
  };

  const saveEdit = (id) => {
    fetch(`http://localhost:3000/Data/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editData),
    })
    .then((response) => response.json())
    .then((result) => {
      dispatch(updateObject(result));
      cancelEdit();
      calculateTotals([...entryList.filter(entry => entry.id !== id), result]);
    })
    .catch((error) => console.log("error", error));
  };

  return (
    <div className="expense-list-card">
      <h2>Transactions List</h2>
      <div className="row">
        <div className="col">
          <div className="total-income-card">
            <h4>Total Income</h4>
            <h2>
              {totalIncome} <span>/-</span>
            </h2>
          </div>
        </div>
        <div className="col">
          <div className="total-expense-card">
            <h4>Total Expense</h4>
            <h2>
              {totalExpense} <span>/-
              </span>
              </h2>
            </div>
        </div>
      </div>

      <div className="transection-list my-3">
        <ul>
          {objectsFromState.length > 0 &&
            objectsFromState.map((entry) => {
              return (
                <li
                  key={entry.id}
                  className={`${entry.type === "inc" ? "income" : "expense"}-li mb-2`}
                  style={{ position: "relative" }}
                >
                  {editId === entry.id ? (
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center" style={{ maxWidth: "100%" }}>
                        <div className="date-sec me-3">
                          <input
                            type="date"
                            name="entry_date"
                            value={editData.entry_date}
                            onChange={handleEditChange}
                          />
                        </div>
                        <div className="d-flex flex-column desc-section text-start">
                          <input
                            type="text"
                            name="description"
                            value={editData.description}
                            onChange={handleEditChange}
                          />
                          {/* <input
                            type="text"
                            name="payment_type"
                            value={editData.payment_type}
                            onChange={handleEditChange}
                          /> */}
                          <select className="form-select" aria-label="Default select example" onChange={handleEditChange}>
            <option value="Cash">Cash</option>
            <option value="Bank Account">Bank Account</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="UPI">UPI</option>
          </select>
                        </div>
                      </div>
                      <div className="d-flex align-items-center action-icons">
                        <img
                          src="./correct.png"
                          className="action-icon me-2"
                          alt="correct"
                          onClick={() => saveEdit(entry.id)}
                          style={{ height: "20px", cursor: "pointer" }}
                        />
                        <img
                          src="./cancel.png"
                          className="action-icon"
                          onClick={cancelEdit}
                          alt="cancel"
                          style={{ height: "20px", cursor: "pointer" }}
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          name="amount"
                          value={editData.amount}
                          onChange={handleEditChange}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center" style={{ maxWidth: "100%" }}>
                        <div className="date-sec me-3">
                          <h5>{moment(entry.entry_date).format("DD")}</h5>
                          <small>{moment(entry.entry_date).format("MMM YYYY").toUpperCase()}</small>
                        </div>
                        <div className="d-flex flex-column desc-section text-start">
                          <b>{entry.description}</b>
                          <small>Paid by {entry.payment_type}</small>
                        </div>
                      </div>
                      <div className="d-flex align-items-center action-icons">
                        <img
                          src="./edit1.png"
                          className="action-icon me-2"
                          alt="edit"
                          onClick={() => startEdit(entry)} // Call startEdit function with entry data
                          style={{ height: "20px", cursor: "pointer" }}
                        />
                        <img
                          src="./delete1.png"
                          className="action-icon"
                          onClick={() => deleteData(entry.id)} // Call deleteData function with entry id
                          alt="delete"
                          style={{ height: "20px", cursor: "pointer" }}
                        />
                      </div>
                      <div>
                        <b className="amount">{entry.amount}/-</b>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseList;
