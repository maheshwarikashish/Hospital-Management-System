import express from 'express'
import { listDoctors, getDoctorById } from '../controllers/doctorController.js'

const doctorRouter = express.Router()

doctorRouter.get('/', listDoctors)
doctorRouter.get('/:id', getDoctorById)

export default doctorRouter
