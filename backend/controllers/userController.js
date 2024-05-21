import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/UserModel.js'

export const signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Check for empty fields
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Please provide all required fields' });
      }
  
      // Check if user already exists using email
      const user = await User.findOne({ email });
      if (user) {
        return res.status(409).json({ error: 'User already exists' });
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

      res.status(201).json({ message: 'User created' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for empty fields
        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User does not exist' });
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ error: 'Invalid password' });
        }

        // Create and sign token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        // Attach token to cookie
        res.cookie('token', token, {httpOnly: true})

        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};

export const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({name: decoded.name});
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

export const verifyToken = (req, res) => {
    return res.json({status: true, message: 'authorized'})
}

export const logout = (req, res) => {
    res.clearCookie('token')
    return res.json({status: true})
}