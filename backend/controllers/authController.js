import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import userModel from '../models/userModel.js'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing fields' })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Invalid email' })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: 'Password too short' })
        }

        const existing = await userModel.findOne({ email })
        if (existing) {
            return res.json({ success: false, message: 'Email already registered' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)

        const user = await userModel.create({ name, email, password: hashed })
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })

        return res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.json({ success: false, message: 'Missing fields' })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'Invalid credentials' })
        }

        const ok = await bcrypt.compare(password, user.password)
        if (!ok) {
            return res.json({ success: false, message: 'Invalid credentials' })
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })
        return res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}


