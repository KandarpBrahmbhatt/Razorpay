import stripe from "../config/stripe.js";
import Course from "../models/course.model.js";

export const createStripeSession = async(req,res)=>{
    try {
        const {courseId} = req.body
        console.log(req.body)

        if (!courseId) {
            return res.status(400).json({message:"courseId is required"})
        }

        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(400).json({message:"course not found"})
        }

        if (!course.price) {
            return res.status(400).json({message:"course price is required"})
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            mode:"payment",

            line_items:[
                {
                    price_data:{
                        currency:"inr",
                        product_data:{
                            name:"Order Payment"
                        },
                        unit_amount: course.price * 100,
                    },
                    quantity:1,
                }
            ],

            success_url: `${process.env.CLIENT_URL}/success?courseId=${course._id}`,
            cancel_url:`${process.env.CLIENT_URL}/cancel`,

            metadata:{
                courseId:course._id.toString(),
                userId:req.user.userId
            }
        })

        return res.status(200).json({message:"stripePayment successfully",url:session.url})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"payment error",error:error.message})
    }
}


export const stripeWebhook = async (req, res) => {
  console.log("WEBHOOK HIT");
  console.log("Content-Type:", req.headers["content-type"]);
  console.log("Body type:", typeof req.body, Buffer.isBuffer(req.body));

  const sig = req.headers["stripe-signature"];
  console.log(sig)
  if (!sig) {
    console.log(" Missing stripe-signature header");
    return res.status(400).send("Missing stripe-signature header");
  }

  let event;

  try {
    // req.body MUST be a Buffer (raw bytes), not a parsed object
    event = stripe.webhooks.constructEvent(
      req.body,          // Must be Buffer
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("EVENT TYPE:", event.type);

    // Handle events
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        const courseId = session.metadata.courseId;

        await Course.findByIdAndUpdate(courseId, {
          paymentStatus: "paid",
          status: "completed",
          stripeSessionId: session.id,
        });

        console.log(" Order updated:", courseId);
        break;

      default:
        console.log(`Unhandled event: ${event.type}`);
    }

  } catch (err) {
    console.log(" Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  return res.json({ received: true });
};