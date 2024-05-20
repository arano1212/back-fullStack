import express from 'express'
import { createHousing, getAllHousing } from '../controllers/housingController.js'

const housingRoutes = express.Router()

housingRoutes.post('/', createHousing)
housingRoutes.get('/', getAllHousing)

export default housingRoutes
