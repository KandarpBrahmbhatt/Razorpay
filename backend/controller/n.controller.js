// import Course from "../models/course.model.js"

// const razorpayInstance = new razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_SECRET,
// })

// export const createOrder = async (req, res) => {
//     try {
//         const { courseId } = req.body
//         console.log(req.body)

//         const course = await Course.findById(courseId)

//         if (!course) {
//             return res.status(400).json({ message: "course not found" })
//         }

//         const options = {
//             // amount: course.price * 100,
//             amount: course.price,
//             currency: 'INR',
//             receipt: `${courseId}.toString`
//         }

//         const order = await razorpayInstance.orders.create(options)
//         return res.status(200).json({ message: "order Created sucessfully", order })
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ message: "created order error", error: error.message })
//     }
// }


// export const verifyOrder = async(req,res)=>{
//     try {
//         const {orderId,courseId} = req.body
//         console.log(req.body)

//         if (!orderId || courseId) {
//             return res.status(400).josn({message:"All field are required"})
//         }             

//     } catch (error) {
//         console.log(error)
//     }
// }



import razorpay from 'razorpay'
import crypto from 'crypto'
import dotenv from 'dotenv'

dotenv.config({path:new URL("../.env", import.meta.url)})

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
})


export const createOrder = async (req, res) => {
    const options = {
        amount: 50000,
        currency: "INR",
        receipt: "receipt_order_1"
    }
    try {
        const order = await razorpayInstance.orders.create(options)
        return res.status(200).json({ message: "oreder created sucessfully", order })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "created order error", error })
    }
}



export const verifyOrder = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        console.log(req.body)

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic =
            expectedSignature === razorpay_signature;

        if (isAuthentic) {

            res.json({
                success: true,
                message: "Payment Verified",
            });

        } else {

            res.status(400).json({
                success: false,
                message: "Invalid Signature",
            });
        }

    } catch (error) {
        console.log(error)
    }
}
