import express from 'express'
const router = express.Router()
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const salt = bcrypt.genSaltSync(10)

router.post('/register', async(req,res) => {
    const {username,password} = req.body
    try {
        console.log(process.env.BCRYPTSALT)
        const userDoc = await User.create({username,password:bcrypt.hashSync(password,salt)})
        res.json(userDoc)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
})

router.post('/login', async(req,res) => {
    const {username,password} = req.body

    try {
        const user = await User.findOne({username})
        if (!user){
            res.status(400).json('Wrong Credentials')
        }
        const passwordcheck = bcrypt.compareSync(password,user.password)
        if(passwordcheck){
            jwt.sign({username:user.username,id:user._id},process.env.JWTSECRET,{},(err,token) => {
                if(err) throw err;
                res.cookie('token',token).json({id: user._id,username})
            }) 
        }
        else{
            res.status(400).json('Wrong Credentials')
        }

    } catch (err) {
        
    }
})

router.get('/profile', async(req,res) => {
    const {token} = req.cookies
    if(!token) res.status(400).json('Not Logged In')
    else{
        jwt.verify(token,process.env.JWTSECRET,{}, async (err,info) => {
            if (err) throw err
            const user = await User.findById(info.id)
            if(!user){
                res.status(400).json(false)
            }
            res.json(true)
        })
    }
})

router.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok')
})

export default router