import React, { useContext, useState } from "react"
import axios from 'axios'


const USER_BASE_URL = "http://localhost:3000/users/";
const TRANSACTION_BASE_URL = "http://localhost:3000/transactions/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])

    const getIncomes = async () => {
        try {
            const response = await axios.get(`${TRANSACTION_BASE_URL}get-incomes`)
            setIncomes(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const getExpenses = async () => {
        try {
            const response = await axios.get(`${TRANSACTION_BASE_URL}get-expenses`)
            setExpenses(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const addExpense = async (income) => {
        const response = await axios.post(`${TRANSACTION_BASE_URL}add-expense`, income, {withCredentials: true})
            .catch((error) =>{
                setError(error.response.data.message)
            })
    }

    const addIncome = async (income) => {
        const response = await axios.post(`${TRANSACTION_BASE_URL}add-income`, income, {withCredentials: true})
            .catch((error) =>{
                setError(error.response.data.message)
            })
    }

    const transactions = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })

        return history
    }

    const deleteIncome = async (id) => {
        const response = await axios.delete(`${TRANSACTION_BASE_URL}delete-income/${id}`)
            .catch((error) =>{
                setError(error.response.data.message)
            })
    }

    const deleteExpense = async (id) => {
        const response = await axios.delete(`${TRANSACTION_BASE_URL}delete-expense/${id}`)
            .catch((error) =>{
                setError(error.response.data.message)
            })
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
            totalExpense,
            addExpense,
            addIncome,
            transactions,
            deleteIncome,
            deleteExpense
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}