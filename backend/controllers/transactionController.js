import { Expense } from '../models/ExpenseModel.js';
import { Income } from '../models/IncomeModel.js';

export const addExpense = async (req, res) => {
    // Get data from request body
    const { title, amount, category, date } = req.body;
    
    const expense = new Expense({
        title,
        amount,
        category,
        date,
        user: req.user._id
    })

    try {
        // Check for empty fields
        if (!title || !amount || !category || !date) {
            return res.status(400).json({ status: false, message: 'All fields are required' });
        }

        // Check if amount is a positive number
        if (amount <= 0 || isNaN(amount)) {
            return res.status(400).json({ status: false, message: 'Amount must be a positive number' });
        }

        // Save expense to database
        await expense.save();

        return res.status(200).json({ status: true, message: 'Expense added' });
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Server error' });
    }
}

export const getExpenses = async (req, res) => {
    try {
        // Get all expenses sorted by creation date in descending order
        const expenses = await Expense.find({ user: req.user._id }).sort({ createdAt: -1 });

        return res.status(200).json(expenses);
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Server error' });
    }
}

export const deleteExpense = async (req, res) => {
    try {
        // Get expense ID from request parameters
        const { id } = req.params;

        // Check if expense exists
        const expense = await Expense.findById(id);
        if (!expense) {
            return res.status(400).json({ status: false, message: 'Expense not found' });
        }

        // Remove expense from database
        await Expense.findByIdAndDelete(id);

        return res.status(200).json({ status: true, message: 'Expense deleted' });
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Server error' });
    }
}

export const addIncome = async (req, res) => {
    const { title, amount, category, date } = req.body;

    const income = new Income({
        title,
        amount,
        category,
        date,
        user: req.user._id
    })

    try {
        if (!title || !amount || !category || !date) {
            return res.status(400).json({ status: false, message: 'All fields are required' });
        }

        if (amount <= 0 || isNaN(amount)) {
            return res.status(400).json({ status: false, message: 'Amount must be a positive number' });
        }

        await income.save();

        return res.status(200).json({ status: false, message: 'Income added' });
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Server error' });
    }
}

export const getIncomes = async (req, res) => {
    try {
        const incomes = await Income.find({ user: req.user._id }).sort({ createdAt: -1 });

        return res.status(200).json(incomes);
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Server error' });
    }
}

export const deleteIncome = async (req, res) => {
    try {
        const { id } = req.params;

        const income = await Income.findById(id);
        if (!income) {
            return res.status(400).json({ status: false, message: 'Income not found' });
        }

        await Income.findByIdAndDelete(id)

        return res.status(200).json({ status: true, message: 'Income deleted' });
    } catch (error) {
        return res.status(500).json({ status: false, message: 'Server error' });
    }
}