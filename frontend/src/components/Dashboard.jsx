import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/globalContext';
import Navigation from './Navigation';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { format, parseISO, subDays, parse, addDays } from 'date-fns';
import styled from 'styled-components';
import axios from 'axios';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid
} from 'recharts';

const Dashboard = () => {
  axios.defaults.withCredentials = true;

  const { totalIncome, getIncomes, getExpenses, totalExpense, getTransactionHistorySortedByDateDesc } = useGlobalContext();

  const [...history] = getTransactionHistorySortedByDateDesc().reverse();
  const slicedHistory = history.slice(0, 5);

  const data = [];
  let start;
  let end;
  history.forEach((transaction) => {
      if (!start) {
          start = new Date(transaction.date);
      }
      end = new Date(transaction.date);
  });


  let totalIncomee = 0;
  let totalExpensee = 0;
  let totalBalancee = 0;
  for (let cur = start; cur <= addDays(end, 1); cur = addDays(cur, 1)) {
      // let totalIncome = 0;
      // let totalExpense = 0;
      history.forEach((transaction) => {
          const { amount, type, date } = transaction;
          const temp = format(new Date(date), "MM-dd-yyyy");
          if (temp === format(cur, 'MM-dd-yyyy')) {
              if (type === 'income') {
                  totalIncomee += amount;
                  totalBalancee += amount;
              } else if (type === 'expense') {
                  totalExpensee += amount;
                  totalBalancee -= amount;
              }
          }
      });
      data.push({
          date: format(cur, 'MM-dd-yyyy'),
          totalBalancee,
          totalIncomee,
          totalExpensee
      });
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
          <ResponsiveContainer className="Res" > 
        <AreaChart className="cool" data={data}> <defs> 
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1"> 
            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} /> 
            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} /> 
            </linearGradient> </defs> 
            {/* <Area type="monotone" dataKey="totalIncome" stroke="#2451B7" fill="url(#color)">
                </Area> 
                <Area type="monotone" dataKey="totalExpense" stroke="#ad31B7" fill="url(#color)">
                    </Area>  */}
                    <Area type="monotone" dataKey="totalBalancee" stroke="#2451B7" fill="url(#color)" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tickFormatter={(date) => { if (format(date, 'd') % 7 === 0) { return format(date, 'MMM, d'); } else { return ''; } }} /> 
                    <YAxis dataKey="totalIncomee" axisLine={false} tickLine={false} tickCount={8} tickFormatter={(number) => `$${number}`}/> 





                    <Tooltip content={CustomTooltip}/> <CartesianGrid opacity={0.1} vertical={false}/> 
                    
                    
                    
                    </AreaChart> 
                    </ResponsiveContainer>
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

function CustomTooltip({ active, payload, label }) {
  if (active) {
      return (
          <div className="tooltip">
              <h4>{format(label, "eeee, d MMM, yyyy")}</h4>
              <p>
                  <strong>Total Balance: </strong> ${payload[0].value}
              </p>
              <p>
                  <strong>Total Income: </strong> ${payload[0].payload.totalIncomee}
              </p>
              <p>
                  <strong>Total Expense: </strong> ${payload[0].payload.totalExpensee}
              </p>
          </div>
      );
  }
}

const DashboardContainer = styled.div`
  margin-left: 364px;
  padding: 20px;
  padding-left: 40px;
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
    padding: 30px;
  }

  .cool {
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