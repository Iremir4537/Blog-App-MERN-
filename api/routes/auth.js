import express from 'express'
const router = express.Router()
import User from '../models/User.js'

router.post('/register', async(req,res) => {
    const {username,password} = req.body
    try {
        const userDoc = await User.create({username,password})
        res.json(userDoc)
    } catch (err) {
        res.status(400).json(err)
    }
})

export default router