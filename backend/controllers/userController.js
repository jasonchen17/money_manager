import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/UserModel.js'

export const signup = async (req, res) => {
    const { name, email, password } = req.body
    const user = await User.findOne({email})
    if (user) {
        return res.json({error: 'User already exists'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    })
    await newUser.save()
    res.json({status: true, message: 'User created'})
}

export const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email})
    if (!user) {
        return res.json({error: 'User does not exist'})
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        return res.json({error: 'Incorrect password'})
    }

    const token = jwt.sign({name: user.name}, process.env.KEY)
    res.cookie('token', token, {httpOnly: true})
    return res.json({status: true, message: 'login successful'})
}

export const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json({status: false, message: "no token"});
        }
        const decoded = jwt.verify(token, process.env.KEY);

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