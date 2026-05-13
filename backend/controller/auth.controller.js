import genToken from "../config/token.js"
import User from "../models/user.model.js"

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        console.log(req.body)

        if (!name || !email || !password) {
            return res.status(400).json({ message: "all field are required" })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "User already exist" })
        }

        const user = await User.create({
            name,
            email,
            password
        })

        const { Accesstoken, refreshToken } = await genToken(user)

        res.cookie("Accesstoken", Accesstoken, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
        })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
        })
        return res.status(200).json({ message: "signup Sucssfully", user, Accesstoken, refreshToken})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "signup error", error })
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body
        console.log(req.body)

        if (!email ||!password) {
            return res.status(400).json({message:"All field are required"})
        }

        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({message:"user not found"})
        }

        const {Accesstoken,refreshToken} = await genToken(user)

        res.cookie("Accesstoken", Accesstoken, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
        })
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
        })    


        return res.status(200).json({message:"login sucessfully",user,Accesstoken,refreshToken})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"login error"})
    }
}