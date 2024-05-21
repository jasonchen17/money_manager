import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/UserModel.js';

export const signup = async (req, res) => {
    try {
        // Get user data from request body
        const { name, email, password } = req.body;

        // Check for empty fields
        if (!name || !email || !password) {
        return res.status(400).json({ status: false, error: 'Please provide all required fields' });
        }

        // Check if user already exists using email
        const user = await User.findOne({ email });
        if (user) {
        return res.status(400).json({ status: false, error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
        name,
        email,
        password: hashedPassword
        });

        // Save user to database
        await newUser.save();

        res.status(200).json({ status: true, message: 'User created' });
    } catch (error) {
        res.status(500).json({ status: false, error: 'Server error' });
    }
};

export const login = async (req, res) => {
    try {
        // Get user data from request body
        const { email, password } = req.body;

        // Check for empty fields
        if (!email || !password) {
            return res.status(400).json({ status: false, error: 'Please provide all required fields' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: false, error: 'User does not exist' });
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(400).json({ status: false, error: 'Invalid password' });
        }

        // Create and sign token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        // Attach token to cookie
        res.cookie('token', token, {httpOnly: true});

        return res.status(200).json({ status: true, message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ status: false, error: 'Server error' });
    }
};

export const verifyUser = async (req, res, next) => {
    try {
        // Get token from cookie
        const token = req.cookies.token;

        // Check if token exists
        if (!token) {
            return res.status(400).json({ status: false, message: "No token" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if user exists
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(400).json({ status: false, message: "User not found" });
        }

        // Attach user to request object
        req.user = user;

        // Go to next middleware
        next();
    } catch (error) {
        return res.status(500).json({ status: false, error: 'Server error' });
    }
}

export const authorizeUser = (req, res) => {
    // verifyUser is checked first
    return res.status(200).json({ status: true, message: 'Authorized' });
}

export const logout = (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ status: true, message: "Logout successful" });
}