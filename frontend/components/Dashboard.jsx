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


    const [...history] = transactions().slice(0, 5)

    const labels = history.map(item => format(new Date(item.date), 'MM/dd/yyyy'))

    useEffect(() => {
      getIncomes()
      getExpenses()
    }, [])

    const chartData = {
      labels,
      datasets: [
            {
              label: 'Incomes',
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

        <h1>Dashboard</h1>

        <div className="chart-history-container">
          <div className="chart-container">
            <Line data={chartData} />
          </div>

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
        <ul className="totals-container">
          <li>
            <h2>Total Income</h2>
            <p>${totalIncome}</p>
          </li>
          <li>
            <h2>Total Expenses</h2>
            <p>${totalExpense}</p>
          </li>
          <li>
            <h2>Total Balance</h2>
            <p>${totalIncome - totalExpense}</p>
          </li>
        </ul>

      </DashboardContainer>
    </>
  )
}

const DashboardContainer = styled.div`
  margin-left: 250px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  
  h1 {
    margin-bottom: 20px;
  }

  .chart-history-container {
    display: flex;
    margin-bottom: 20px;
  }
  
  .chart-container {
    border-radius: 10px;
    border: 1px solid red;
    width: 85rem;
  }

 .chart-container canvas {
    padding: 20px;
  }

  .history-container {
    h2 {
      margin-bottom: 10px;
    }

    padding: 20px;
    margin-left: 20px;
    flex-grow: 1;
    margin-top: 0px;
    padding-top: 0px;

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

  .totals-container {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    width: 85rem;
  }

  .totals-container li {
    display: flex;
    justify-content: space-between;
    border: 1px solid red;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    align-items: center;
  }

  .totals-container li p {
    font-size: 24px;
  }
  
`;

export default Dashboard