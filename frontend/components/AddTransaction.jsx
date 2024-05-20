import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useGlobalContext } from '../context/globalContext'
import Navigation from './Navigation'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const AddTransaction = () => {
    const {addExpense, addIncome, getIncomes, getExpenses, transactions} = useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
        type: ''
    })

    const {title, amount, date, category, description, type} = inputState

    const [...history] = transactions().slice(0, 5)

    const handleInput = name => e => {
        setInputState({
            ...inputState,
            [name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (type === 'income') {
            addIncome(inputState)
        } else {
            addExpense(inputState)
        }
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
            type: ''
        })
    }

    useEffect(() => {
        getIncomes()
        getExpenses()
      }, [])
    
  return (
    <>
        <Navigation />
        <AddContainer>
            <h1>Add Transaction</h1>

            <div className="form-history-container">
                <form onSubmit={handleSubmit}>

                    <select required value={type} name="type" id="type" onChange={handleInput('type')}>
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
                            setInputState({...inputState, date: date})
                        }}
                        autoComplete="off"
                    />

                    <select required value ={category} name="category" id="category" onChange={handleInput('category')}>
                        <option value="" disabled>Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Bills">Bills</option>
                        <option value="Misc">Miscellaneous</option>
                    </select>

                    <button type="submit">Add Transaction</button>
                </form>

                <div className="history-container">
                    <h2>Past 5 transactions</h2>
                    <ul>
                    {history.map((item) =>{
                            const {_id, title, amount, type} = item
                            let amountText;
                            let amountColor;

                            if (type === 'expense') {
                                amountText = `-$${amount <= 0 ? 0 : amount}`;
                                amountColor = 'red';
                            } else {
                                amountText = `+$${amount <= 0 ? 0 : amount}`;
                                amountColor = 'green';
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
        border: 1px solid red;
        border-radius: 5px;
    }

    .date-picker {
        width: 100%;
    }

    form select {
        width: 40%;
    }

    form button {
        background-color: red;
        cursor: pointer;
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
          border: 1px solid red;
          border-radius: 10px;
          padding: 20px;
          text-align: center;
          background: blue;
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
          border: 1px solid red;
          border-radius: 10px;
          margin-bottom: 15px;
      }
    
      .history-container li div {
        margin: 0 20px;
      }

`;

export default AddTransaction