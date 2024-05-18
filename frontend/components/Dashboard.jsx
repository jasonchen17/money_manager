import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useGlobalContext } from '../context/globalContext'
import Navigation from './Navigation'

const Dashboard = () => {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    const { totalIncome, getIncomes, getExpenses, totalExpense } = useGlobalContext()

    useEffect(() => {
      getIncomes()
      getExpenses()
    }, [])
  return (
    <div>
      <Navigation />
      Dashboard {totalIncome} {totalExpense}
    </div>
  )
}

export default Dashboard