import express from 'express'
import dotenv from 'dotenv'
import CookieParser from 'cookieparser'
import connectDb from './config/db.js'
import courseRouter from './routes/course.routes.js'
import razorpayRouter from './routes/razorPay.routes.js'
import authRouter from './routes/auth.routes.js'
import nRouter from './routes/n.routes.js'
import { stripeWebhook } from './controller/stripePayment.controller.js'
import cors from 'cors'
import socialRouter from './routes/social.routes.js'
import passport from './config/passport.js'
dotenv.config({path:new URL("./.env", import.meta.url)})


const app = express()
app.post(
  "/api/webhook/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhook
);
app.use(express.json())
app.use((req, res, next) => {
    req.cookies = req.headers.cookie ? CookieParser.parse(req.headers.cookie) : {}
    next()
})


app.use(cors());
app.use(passport.initialize());
app.use("/api/auth",authRouter)
app.use("/api/course",courseRouter)
app.use("/api/razorpay",razorpayRouter)
app.use("/api/n",nRouter)
app.use("/api/social", socialRouter);
const port = process.env.PORT || 8080
app.listen(port,()=>{
    console.log(`server is started ${port}`)
    connectDb()
})


// 4111 1111 1111 1111
// Any future expiry
// Any CVV
// OTP: 1234

                                                                                                      
