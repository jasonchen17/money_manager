import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useGlobalContext } from '../context/globalContext'
import Navigation from './Navigation'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker'

const AddTransaction = () => {
    const {addExpense, addIncome} = useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
        type: ''
    })

    const {title, amount, date, category, description, type} = inputState

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
  return (
    <div>
        <Navigation />
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    value={title}
                    name={'title'}
                    placeholder="Title"
                    onChange={handleInput('title')}
                />    
            </div>
            <div>
                <input
                    type="text"
                    value={amount}
                    name={'amount'}
                    placeholder="Amount"
                    onChange={handleInput('amount')}
                />
            </div>
            <div>
                <DatePicker
                    id='date'
                    placeholderText='Select Date'
                    selected={date}
                    dateFormat='dd/MM/yyyy'
                    onChange={(date) => {
                        setInputState({...inputState, date: date})
                    }}
                />
            </div>
            <div>
                <select required value ={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled>Select Category</option>
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="bills">Bills</option>
                    <option value="others">Others</option>
                </select>
            </div>
            <div>
                <textarea
                    value={description}
                    name={'description'}
                    placeholder="Description"
                    onChange={handleInput('description')}
                />
            </div>
            <div>
                <select required value={type} name="type" id="type" onChange={handleInput('type')}>
                    <option value="" disabled>Select Type</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>
            <div>
                <button type="submit">Add Transaction</button>
            </div>
        </form>
    </div>
  )
}

export default AddTransaction