import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const genToken =(user)=>{
    const Accesstoken = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"15m"})
    
    const refreshToken = jwt.sign({userId:user._id},process.env.JWT_REFRESH_TOKEN,{expiresIn:"7d"})

    return {Accesstoken,refreshToken}
}

export default genToken

