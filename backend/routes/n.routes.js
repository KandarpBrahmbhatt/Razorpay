import express from 'express'
import { isAuth } from '../middaleware/auth.middaleware.js';
import { createOrder, verifyOrder } from '../controller/n.controller.js';
import { createStripeSession } from '../controller/stripePayment.controller.js';

const nRouter = express.Router()

nRouter.post("/create",createOrder)
nRouter.post("/verify",verifyOrder)

//stripe payment

nRouter.post("/stripe",isAuth,createStripeSession)
export default  nRouter
