import Stripe from 'stripe'
import dotenv from 'dotenv'

dotenv.config({path:new URL("../.env", import.meta.url)})

const stripe = new Stripe(process.env.STRIPE_SCRETE_KEY)

export default stripe;
