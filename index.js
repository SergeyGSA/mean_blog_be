import express from 'express'
import fs from 'fs'
import multer from 'multer'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { router } from './src/router/index.js'
import { errorMiddleware } from './src/middlewares/error.middleware.js'

dotenv.config()

const app = express()

// TODO: rework
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads')
    }
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })
// TODO: /rework

app.use(express.json())
app.use(cookieParser())
// app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))
app.use(cors())
app.use('', router)
app.use(errorMiddleware)

// TODO: rework
app.use('/uploads', express.static('uploads'))

app.post('/upload', /* authMiddleware */ upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
})
// TODO: /rework

const start = async () => {
  try {
    await mongoose
      .connect(`${process.env.DB_URL}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log('DB ok'))

    app.listen(process.env.PORT || 8080, () =>
      console.log(`Server started on port ${process.env.PORT}`),
    )
  } catch (error) {
    console.log(error)
  }
}

start()
