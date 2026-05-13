import express from 'express'
import { createCourse } from '../controller/course.controller.js'

const courseRouter = express.Router()

courseRouter.post("/create",createCourse)

export default courseRouter