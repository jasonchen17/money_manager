import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/globalContext';
import Navigation from './Navigation';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const AddTransaction = () => {
    axios.defaults.withCredentials = true;
    
    const {
        addExpense, addIncome, getIncomes, getExpenses, getTransactionHistoryByCreatedAtDesc, error, setError
    } = useGlobalContext();

    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        type: ''
    });

    // Destructure input state
    const {title, amount, date, category, type} = inputState;

    // Get the last 5 transactions
    const [...history] = getTransactionHistoryByCreatedAtDesc().sort().slice(0, 5);

    const handleInput = name => e => {
        // Update input state
        setInputState({...inputState, [name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        // Prevent reload on submit
        e.preventDefault();

        let success;

        if (type === 'income') {
            success = await addIncome(inputState);
        } else {
            success = await addExpense(inputState);
        }

        //  Clear input fields if successful submit
        if (success) {
            setInputState({
                title: '',
                amount: '',
                date: '',
                category: '',
                type: ''
            });
            toast.success('Transaction added successfully');
        }
    }

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    useEffect(() => {
        // No token error not sure what the cause is
        if (error && error !== 'no token') {
            toast.error(error);
            setError(null);
        }
    }, [error, setError]);
    return (
        <>
            <Navigation />
            <AddContainer>
                <h1>Add Transaction</h1>

                <div className="form-history-container">
                    <form onSubmit={handleSubmit}>

                        <select value={type} name="type" id="type" onChange={handleInput('type')}>
                            <option value="" disabled>Select Type</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>

                        <input
                            type="text"
                            value={title}
                            name={'title'}
                            placeholder="Title"
                            onChange={handleInput('title')}
                            autoComplete="off"
                        /> 

                        <input
                            type="text"
                            value={amount}
                            name={'amount'}
                            placeholder="Amount"
                            onChange={handleInput('amount')}
                            autoComplete="off"
                        />

                        <DatePicker
                            className="date-picker"
                            id='date'
                            placeholderText='Select Date'
                            selected={date}
                            dateFormat='dd/MM/yyyy'
                            onChange={(date) => {
                                setInputState({...inputState, date: date});
                            }}
                            autoComplete="off"
                        />

                        <select value ={category} name="category" id="category" onChange={handleInput('category')}>
                            <option value="" disabled>Select Category</option>
                            <option value="Food">Food</option>
                            <option value="Transport">Transport</option>
                            <option value="Housing">Housing</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Health">Health</option>
                            <option value="Education">Education</option>
                            <option value="Personal Care">Personal Care</option>
                            <option value="Gifts">Gifts</option>
                            <option value="Insurance">Insurance</option>
                            <option value="Savings">Savings</option>
                            <option value="Investments">Investments</option>
                            <option value="Debt Payments">Debt Payments</option>
                            <option value="Miscellaneous">Miscellaneous</option>
                        </select>

                        <button type="submit">Add Transaction</button>
                    </form>

                    <div className="history-container">
                        <h2>Recently added</h2>

                        <ul>
                        {history.map((item) =>{
                                const {_id, title, amount, type} = item;
                                let amountText;
                                let amountColor;

                                if (type === 'expense') {
                                    amountText = `-$${amount <= 0 ? 0 : amount}`;
                                    amountColor = 'var(--expense-color)';
                                } else {
                                    amountText = `+$${amount <= 0 ? 0 : amount}`;
                                    amountColor = 'var(--income-color)';
                                }
                                
                                return (
                                    <li key={_id}>
                                        <div>{title}</div>
                                        <div style={{ color: amountColor }}>{amountText}</div>
                                    </li>
                                )
                        })}
                        </ul>

                        <Link to="/transactions">View all transactions</Link>
                    </div>
                </div>
            </AddContainer>
        </>
    )
}

const AddContainer = styled.div`
    margin-left: 250px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 364px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    border: 2px solid;
    height: 77rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 10px;
    width: 2164px;
    background-color: var(--secondary-color);
    padding-left: 40px;

    h1 {
        align-self: flex-start;
    }

    .form-history-container {
        display: flex;
        margin-top: 20px;
        gap: 20px;
        justify-content: center;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: left;
        width: 30rem;
        margin-top: 5px;
    }

    form input,
    form select,
    form button {
        margin-bottom: 20px;
        font-size: 1rem;
        padding: 10px;
        border: 2px solid;
        border-radius: 5px;
        background-color: transparent;
        &::placeholder {
            color: var(--placeholder-color);
          }
    }

    .date-picker {
        width: 100%;
    }

    form select {
        width: 40%;
        background-color: #191919;
        cursor: pointer;
        color: var(--placeholder-color);
        border: 2px solid var(--text-color);
    }

    form select option {
        color: var(--placeholder-color);
      }

    form button {
        cursor: pointer;
        background-color: #556B2F;
        border: none;
        height: 3rem;
    }

    .history-container {
        display: flex;
        flex-direction: column;
        width: 30rem;
        margin-top: 0px;
    
        a {
          display: block;
          text-decoration: none;
          margin-top: 15px;
          border-radius: 10px;
          padding: 20px;
          text-align: center;
          background-color: var(--button-color);
        }
      
      }
    
      .history-container ul {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
      }
    
      .history-container li {
          display: flex;
          justify-content: space-between;
          padding: 20px 0px;
          border-radius: 10px;
          margin-bottom: 15px;
          background-color: var(--third-color);
      }
    
      .history-container li div {
        margin: 0 20px;
      }
`;

export default AddTransaction;