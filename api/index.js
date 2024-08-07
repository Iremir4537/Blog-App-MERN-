import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoute from './routes/auth.js'
import postRoute from './routes/post.js'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'

dotenv.config({ path: './api/config/config.env'})
connectDB()

const app = express()

app.use(cors({credentials:true,origin:'http://localhost:3000'}))
app.use(express.json())
app.use(cookieParser())

app.use('/auth',authRoute)
app.use('/post',postRoute)

app.listen(process.env.PORT,() => {
    console.log(`Server is running on Port ${process.env.PORT}`)
})