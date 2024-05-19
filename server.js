import express from 'express'
import authRoutes from './routes/authRoutes.js'
import { connect } from './config/database.js'
import userRoutes from './routes/userRoutes.js'
import housingRoutes from './routes/housingRoutes.js'

const PORT = process.env.PORT || 3000

connect()

const api = express()
api.use(express.json())

api.use('/api/v1', authRoutes)
api.use('/api/v1/users', userRoutes)
api.use('/api/v1/housing', housingRoutes)

api.listen(PORT, () => {
  console.log(`server is running in http://localhost:${PORT} 🌱`)
})
