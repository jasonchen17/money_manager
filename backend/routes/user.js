import express from 'express'
import bcrypt from 'bcrypt'
const router = express.Router()
import {User} from '../models/User.js'
import jwt from 'jsonwebtoken'
import { Expense } from '../models/ExpenseModel.js'
import { Income } from '../models/IncomeModel.js'

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body
    const user = await User.findOne({email})
    if (user) {
        return res.json({error: 'User already exists'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    })
    await newUser.save()
    res.json({status: true, message: 'User created'})
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email})
    if (!user) {
        return res.json({error: 'User does not exist'})
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        return res.json({error: 'Incorrect password'})
    }

    const token = jwt.sign({username: user.username}, process.env.KEY)
    res.cookie('token', token, {httpOnly: true})
    return res.json({status: true, message: 'login successful'})
})

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json({status: false, message: "no token"});
        }
        const decoded = jwt.verify(token, process.env.KEY);

        const user = await User.findOne({username: decoded.username});
        if (!user) {
            return res.json({status: false, message: "no user"});
        }

        // Attach user to request
        req.user = user;
        next()
    } catch (err) {
        return res.json(err);
    }
}

router.get('/verify', verifyUser, (req, res) => {
    return res.json({status: true, message: 'authorized'})
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({status: true})
})

router.post('/add-expense', verifyUser, async (req, res) => {
    const { title, amount, category, description, date } = req.body
    const income = Expense({
        title,
        amount,
        category,
        description,
        date,
        user: req.user._id
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
})

router.get('/get-expenses', verifyUser, async (req, res) => {
    try {
        const incomes = await Expense.find({user: req.user._id}).sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
})

router.delete('/delete-expense/:id', verifyUser, async (req, res) => {
    const {id} = req.params;
    Expense.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
})

router.post('/add-income', verifyUser, async (req, res) => {
    console.log("hellooooooooo")
    const {title, amount, category, description, date}  = req.body

    const income = Income({
        title,
        amount,
        category,
        description,
        date,
        user: req.user._id
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
})

router.get('/get-incomes', verifyUser, async (req, res) =>{
    try {
        const incomes = await Income.find({user: req.user._id}).sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
})

router.delete('/delete-income/:id', verifyUser, async (req, res) =>{
    const {id} = req.params;
    Income.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
})

export {router as UserRouter}