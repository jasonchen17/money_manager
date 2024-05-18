import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useGlobalContext } from '../context/globalContext'
import Navigation from './Navigation'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import { format } from 'date-fns'

const Dashboard = () => {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    const { totalIncome, getIncomes, getExpenses, totalExpense, incomes, expenses, transactions } = useGlobalContext()


    const [...history] = transactions()

    const labels = history.map(item => format(new Date(item.date), 'MM/dd/yyyy'))

    useEffect(() => {
      getIncomes()
      getExpenses()
    }, [])

    const chartData = {
      labels,
      datasets: [
            {
              label: 'Income',
              data: incomes.map((income) => {
                  const { amount } = income;
                  return amount;
              }),
              borderColor: 'green',
              backgroundColor: 'rgba(0, 255, 0, 0.1)',
              pointRadius: 5,
              pointHoverRadius: 7,
              tension: 0.4
          },
          {
              label: 'Expenses',
              data: expenses.map((expense) => {
                  const { amount } = expense;
                  return amount;
              }),
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              pointRadius: 5,
              pointHoverRadius: 7,
              tension: 0.4
          }
      ]
  };

  return (
    <div>
      <Navigation />
      <h1>Dashboard</h1>
      <div>
        <Line data={chartData}/>
      </div>
    </div>
  )
}

export default Dashboard