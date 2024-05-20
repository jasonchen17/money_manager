import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useGlobalContext } from '../context/globalContext'
import Navigation from './Navigation'
import styled from 'styled-components'
import { format } from 'date-fns'

const Transactions = () => {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    const {transactions, getIncomes, getExpenses, deleteExpense, deleteIncome } = useGlobalContext()
    const [...history] = transactions()


    const handleDelete = (id, type) => {
        if (type === 'expense') {
            deleteExpense(id)
        } else {
            deleteIncome(id)
        }
    }

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [deleteExpense, deleteIncome])
  return (
    <>
      <Navigation />
      <HistoryContainer>
        <h1>Transaction History</h1>
        <ul>
            <li className="list-header">
                <div>Date</div>
                <div>Title</div>
                <div>Category</div>
                <div>Amount</div>
                <div className="edit-header"><i class="fa-solid fa-trash"></i></div>
            </li>

            {history.map((item) =>{
                    const {_id, title, amount, type, date, category} = item
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
                            <div>{format(new Date(date), 'MM/dd/yyyy')}</div>
                            <div>{title}</div>
                            <div>{category}</div>
                            <div style={{ color: amountColor }}>{amountText}</div>
                            <div className="edit" onClick={() => handleDelete(_id, type)}>
                                <i class="fa-solid fa-trash"></i>
                            </div>
                        </li>
                    )
            })}
        </ul>
      </HistoryContainer>
    </>
  )
}

const HistoryContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    margin-left: 364px;
    height: 77rem;
    position: absolute;
    width: 2164px;
    top: 50%;
    transform: translateY(-50%);
    width: 2164px;
    border: 1px solid;
    border-radius: 10px;
    background-color: var(--secondary-color);

    .list-header {
        font-weight: bold;
        background-color: #10253d;
    }

    ul {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        overflow-y: scroll;
        padding-right: 20px;
    }

    ul::-webkit-scrollbar {
        width: 6px;
    }

    ul::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 3px;
    }

    li {
        display: flex;
        justify-content: space-between;
        padding: 20px 0px;
        border-radius: 10px;
        margin-bottom: 15.4px;
        background-color: var(--third-color);
    }

    li div {
        flex: 1;
        text-align: center;
    }

    .edit {
        cursor: pointer;
        flex: 0;
        margin-right: 5rem;
    }

    .edit-header {
        flex: 0;
        margin-right: 5rem;
        visibility: hidden;
    }
    
`;

export default Transactions