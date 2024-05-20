import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useGlobalContext } from '../context/globalContext'
import Navigation from './Navigation'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import { format } from 'date-fns'
import styled from 'styled-components'

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
    <>
      <Navigation />
      <DashboardContainer>
        <div className="left-container">
          <h1>Dashboard</h1>
          <div className="chart-container">
          <Line data={chartData} />
          </div>
          <div className="totals-container">
          <h2>Income</h2>
          <p>{totalIncome}</p>
          <h2>Expenses</h2>
          <p>{totalExpense}</p>
          <h2>Balance</h2>
          <p>{totalIncome - totalExpense}</p>
        </div>
        </div>
        <div className="history-container">
          <h2>Past 5 transactions</h2>
          <ul>
            {history.slice(0, 5).map((transaction, index) => {
              const { amount, category, date, type } = transaction
              return (
                <li key={index}>
                  <h3>{type === 'income' ? 'Income' : 'Expense'}</h3>
                  <h4>{category}</h4>
                  <p>{amount}</p>
                  <p>{format(new Date(date), 'MM/dd/yyyy')}</p>
                </li>
              )
            })}
          </ul>
          <Link to="/transactions">View all transactions</Link>
        </div>
      </DashboardContainer>
    </>
  )
}

const DashboardContainer = styled.div`
  margin-left: 250px;
  padding: 20px;
  display: flex;

  .left-container {
    flex: 3;
    margin-right: 20px;
  }

  .left-container h1 {
    margin-bottom: 10px;
  }
  
  .chart-container canvas {
    padding: 20px;
    border-radius: 5px;
    border: 1px solid red;
  }

  .totals-container {
    padding: 20px;
    border-radius: 5px;
    border: 1px solid red;
    margin-top: 20px;
  }

  .history-container {
    flex: 2;
  }


`

export default Dashboard