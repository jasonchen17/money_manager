import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/globalContext';
import Navigation from './Navigation';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { format } from 'date-fns';
import styled from 'styled-components';

const Dashboard = () => {

  const { totalIncome, getIncomes, getExpenses, totalExpense, incomes, expenses, transactionHistory } = useGlobalContext();

  const history = transactionHistory();
  const slicedHistory = history.slice(0, 5);

  const chartData = {
    datasets: [

    ]
  }

  useEffect(() => {
    getIncomes()
    getExpenses()
  }, []);
  return (
    <>
      <Navigation />
      <DashboardContainer>
        <h1>Dashboard</h1>

        <div className="chart-history-container">
          <div className="chart-container">
          <Line
            data={chartData}
            options={{
              scales: {
                x: {
                  grid: {
                    color: '#6b6b6b',
                  },
                  ticks: {
                    color: '#6b6b6b',
                  },
                },
                y: {
                  grid: {
                    color: '#6b6b6b',
                  },
                  ticks: {
                    color: '#6b6b6b',
                  },
                },
              },
            }}
          />
          </div>

          <div className="history-container">
            <h2>Past 5 transactions</h2>
            <ul>
              {slicedHistory.map((item) =>{
                      const {_id, title, amount, type} = item
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
        <ul className="totals-container">
          <li>
            <h2 className="income">Total Income</h2>
            <p>${totalIncome}</p>
          </li>
          <li>
            <h2 className="expenses">Total Expenses</h2>
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

  
  h1 {
    margin-bottom: 20px;
  }

  .chart-history-container {
    display: flex;
    margin-bottom: 20px;
  }
  
  .chart-container {
    border-radius: 10px;
    border: 2px solid;
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

  .totals-container {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    width: 85rem;
  }

  .totals-container li {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    align-items: center;
    background-color: var(--third-color);
  }

  .totals-container li p {
    font-size: 24px;
  }

  .income {
    color: #228B22;
  }

  .expenses {
    color: #B22222;
  }
  
`;

export default Dashboard;