import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useGlobalContext } from '../context/globalContext'
import Navigation from './Navigation'

const Transactions = () => {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    const {transactions, getIncomes, getExpenses } = useGlobalContext()
    const [...history] = transactions()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])
  return (
    <div>
      <Navigation />
      Transaction History
      {history.map((item) =>{
                const {_id, title, amount, type} = item
                return (
                    <div key={_id} className="history-item">
                        <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {title}
                        </p>

                        <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {
                                type === 'expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0: amount}`
                            }
                        </p>
                    </div>
                )
            })}
    </div>
  )
}

export default Transactions