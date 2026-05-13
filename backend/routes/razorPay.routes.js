import express from 'express'
import { createOrder } from "../controller/razorpay.controller.js";
import { isAuth } from '../middaleware/auth.middaleware.js';

const razorpayRouter = express.Router()

razorpayRouter.post("/create",isAuth,createOrder)

export default  razorpayRouter