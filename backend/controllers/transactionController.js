import { Expense } from '../models/ExpenseModel.js'
import { Income } from '../models/IncomeModel.js'

export const addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body
    const expense = new Expense({
        title,
        amount,
        category,
        description,
        date,
        user: req.user._id
    })

    try {
        // Validations
        if (!title || !category || !date) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' })
        }
        await expense.save()
        res.status(200).json({ message: 'Expense Added' })
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

export const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user._id }).sort({ createdAt: -1 })
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

export const deleteExpense = async (req, res) => {
    const { id } = req.params
    try {
        await Expense.findByIdAndDelete(id)
        res.status(200).json({ message: 'Expense Deleted' })
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

export const addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body
    const income = new Income({
        title,
        amount,
        category,
        description,
        date,
        user: req.user._id
    })

    try {
        // Validations
        if (!title || !category || !date) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' })
        }
        await income.save()
        res.status(200).json({ message: 'Income Added' })
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

export const getIncomes = async (req, res) => {
    try {
        const incomes = await Income.find({ user: req.user._id }).sort({ createdAt: -1 })
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

export const deleteIncome = async (req, res) => {
    const { id } = req.params
    try {
        await Income.findByIdAndDelete(id)
        res.status(200).json({ message: 'Income Deleted' })
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}