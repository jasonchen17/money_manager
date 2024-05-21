import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { userRouter } from './routes/userRoutes.js'
import { transactionRouter } from './routes/transactionRoutes.js'

// Load environment variables from .env file
dotenv.config()

// Create express app
const app = express()

// Middlewares

// Parse JSON request body
app.use(express.json())

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

// Parse cookies
app.use(cookieParser())

// Routes
app.use('/users', userRouter)
app.use('/transactions', transactionRouter)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database Connected"))
    .catch((error) => console.log("Database Connection Error", error))

// Start server
app.listen(process.env.PORT, () => (
    console.log("Server is Running")
))