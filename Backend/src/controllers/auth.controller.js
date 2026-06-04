const UserModel = require('../models/User.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function registerUser(req, res){
    try {
        const { username, email, password } = req.body 

        if(!username || !email || !password){
            return res.status(401).json({
                message: "All fields are required"
            })
        }

        const isAlreadyExists = await UserModel.findOne({  
            $or:[
                { username },
                { email }
            ]
        })

        if(isAlreadyExists){
            return res.status(409).json({
                message: "User already exists" + (isAlreadyExists.email === email ? "E-Mail already exists" : "Username already exists")
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await UserModel.create({
            username, 
            email,
            password: hashedPassword
        })
         
        const token = jwt.sign({
            id: user._id,
            email: user.email 
        }, process.env.JWT_SECRET, {expiresIn: "1d"})

        res.cookie("token", token, {
            httpOnly: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: "User registered successfully",
            token,
            user:{
                username: user.username,
                email: user.email,
                profileImage: user.profileImage
            }
        })
    } catch(error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function loginUser(req, res){
    try {
        const { email, username, password } = req.body

        if(!email && !username || !password){
            return res.status(401).json({
                message: "All fields are required"
            })
        }

        const user = await UserModel.findOne({ 
            $or: [
                { username },
                { email }
            ]
         })

         if(!user){
            return res.status(409).json({
                message: "User not found"
            })
         }

         const isPasswordValid = await bcrypt.compare(password, user.password)

         if(!isPasswordValid){
            return res.status(409).json({
                message: "Invalid credentials"
            })
         }

         const token = jwt.sign({
            id: user._id
         }, process.env.JWT_SECRET, {expiresIn: "1d"})

         res.cookie("token", token, {
            httpOnly: false,
            sameSite: "lax",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
         })

         res.status(200).json({
            message: "User logged in successfully",
            token,
            user: {
                username: user.username,
                email: user.email,
                profileImage: user.profileImage
            }
         })
    } catch(error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function getMe(req, res) {
    try {
        const userId = req.user._id

        const user = await UserModel.findById(userId)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Error fetching user",
            error: error.message
        })
    }
}

async function logoutUser(req, res) {
    try {
        res.clearCookie("token")

        res.status(200).json({
            message: "User logged out successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error logging out",
            error: error.message
        })
    }
}

module.exports = { 
    registerUser,
    loginUser,
    getMe,
    logoutUser
}

