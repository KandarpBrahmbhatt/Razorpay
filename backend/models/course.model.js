import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    subTitle:{
        type:String
    },
    description:{
        type:String
    },
    level:{
        type:String,
        enum:['Beginner','Intermediate','Advanced']
    },
    price:{
        type:Number
    },
    enrolledStudents:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    lectures:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Lecture"
    }],
    creator:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },



  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true
  },
    totalAmount: Number,
  status: {
  type: String,
  enum: ["pending", "completed"],
  default: "pending"
},

  createdAt: {
    type: Date,
    default: Date.now //  correct
  },

  expiresAt: {
    type: Date,
    index: { expires: 3600 } //  TTL INDEX (auto delete after 1 hour)
  },
  paymentIntentId: String,
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },
  stripeSessionId: String
},{timestamps:true})

const Course = mongoose.model("Course",courseSchema)

export default Course
