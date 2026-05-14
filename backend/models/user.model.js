import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    socialId:{
        type:String
    },
    providers: {
      google: {
        id: {
          type: String,
          index: true // fast lookup for Google login
        },
        email: String
      },
      facebook: {
        id: {
          type: String,
          index: true // fast lookup for Facebook login
        },
        email: String
      }
    },

    displayName:{
        type:String
    },
    avatar:{
        type:String
    }
},{
    timestamps:true
})


const User = mongoose.model("User",userSchema)

export default User
