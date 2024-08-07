import express from 'express'
const router = express.Router()
import multer from 'multer'
const uploadMiddleware = multer({dest:'uploads/'})

router.post('/create', uploadMiddleware.single('file') ,async(req,res) => {
    console.log(req.files)
    res.json(req.files)
})

export default router