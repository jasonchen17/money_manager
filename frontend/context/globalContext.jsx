import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "http://localhost:3000/auth/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])

    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`)
            setIncomes(response.data)
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`)
            setExpenses(response.data)
            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0)

    const totalIncome = incomes.reduce((total, income) => total + income.amount, 0)

    return (
        <GlobalContext.Provider value={{
            incomes,
            setIncomes,
            getIncomes,
            totalIncome,
            expenses,
            setExpenses,
            getExpenses,
            totalExpense
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}