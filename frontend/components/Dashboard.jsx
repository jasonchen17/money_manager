import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useGlobalContext } from '../context/globalContext'

const Dashboard = () => {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    const { totalIncome, getIncomes } = useGlobalContext()

    useEffect(() => {
      getIncomes()
    }, [])
  return (
    <div>
      Dashboard {totalIncome}
    </div>
  )
}

export default Dashboard