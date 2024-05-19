import express from 'express'
import { createHousing } from '../controllers/housingController.js'

const housingRoutes = express.Router()

housingRoutes.post('/', createHousing)

export default housingRoutes
