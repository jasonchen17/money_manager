import React, { useEffect } from 'react';
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
import { useGlobalContext } from '../context/globalContext';
import { format, parseISO, subDays, parse } from 'date-fns';
import Navigation from './Navigation';
import styled from 'styled-components';

const Chart = () => {
    axios.defaults.withCredentials = true;
    
    const { getTransactionHistorySortedByDateDesc, getIncomes, getExpenses } = useGlobalContext();
    const [...history] = getTransactionHistorySortedByDateDesc().reverse();

    const data = [];
    let totalIncome = 0;
    let totalExpense = 0;

    history.forEach((transaction, index) => {
        const { _id, title, amount, type, date, category } = transaction;
        const formattedDate = format(new Date(date), 'MM-dd-yyyy');
        
        let nextDate;
        if (history[index + 1]) {
            nextDate = format(new Date(history[index + 1]?.date), 'MM-dd-yyyy');
        }
            if (type === 'income') {
                totalIncome += amount;
            } else if (type === 'expense') {
                totalExpense += amount;
            }

          if (formattedDate !== nextDate) {
            data.push({
              date: formattedDate,
              totalIncome,
              totalExpense,
            });

            totalIncome = 0;
            totalExpense = 0;
            }
      });

    useEffect(() => {
        getIncomes();
        getExpenses();
      }, []);

    return (
        <Styl>
        <ResponsiveContainer className="Res" >
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                        <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
                    </linearGradient>
                </defs>
                <Area dataKey="totalIncome" stroke="#2451B7" fill="url(#color)"></Area>
                <Area dataKey="totalExpense" stroke="#ad31B7" fill="url(#color)"></Area>

                <XAxis dataKey="date" axisLine={false} tickLine={false} tickFormatter={(date) => {
                if (format(date, 'd') % 7 === 0) {
                    return format(date, 'MM-dd-yyyy');
                } else {
                    return '';
                }
            }} 
        />
                <YAxis dataKey="totalIncome" axisLine={false} tickLine={false} tickCount={8} tickFormatter={(number) => `$${number}`}/>
                <Tooltip content={CustomTooltip}/>
                <CartesianGrid opacity={0.1} vertical={false}/>
            </AreaChart>
        </ResponsiveContainer>
        </Styl>
    );
};

function CustomTooltip({ active, payload, label }) {
    if (active) {
        return (
            <div className="tooltip">
                <h4>{format(label, "eeee, d MMM, yyyy")}</h4>
                <p>
                    <strong>Total Income: </strong> ${payload[0].value}
                </p>
                <p>
                    <strong>Total Expense: </strong> ${payload[1].value}
                </p>
            </div>
        );
    }
}


const Styl = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .Res {
        padding: 100px;
        border: 1px solid red;
    }
    
`;

export default Chart;