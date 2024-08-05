import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoute from './routes/auth.js'
import connectDB from './config/db.js'

dotenv.config({ path: './api/config/config.env'})
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth',authRoute)

app.listen(process.env.PORT,() => {
    console.log(`Server is running on Port ${process.env.PORT}`)
})