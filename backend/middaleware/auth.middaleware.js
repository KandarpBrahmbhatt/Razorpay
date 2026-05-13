import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()
export const isAuth = async(req,res,next)=>{
    const token = req.cookies?.Accesstoken

    if (!token) {
        console.log("token not found")
        return res.status(400).json({message:"Not Authenticated"})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
    } catch (error) {
        console.log("isAuth error")
        return res.status(400).json({message:"Invalid Token"})
    }
    next()
}
