import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useGlobalContext } from '../context/globalContext'
import Navigation from './Navigation'
import "react-datepicker/dist/react-datepicker.css";

const Expenses = () => {
    const {addExpense, getExpenses, expenses} = useGlobalContext()
  return (
    <div>
        <Navigation />
        <h1>Add Expense</h1>
        
    </div>
  )
}

export default Expenses