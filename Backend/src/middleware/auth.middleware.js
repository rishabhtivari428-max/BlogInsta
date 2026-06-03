const UserModel = require('../models/User.model')
const jwt = require('jsonwebtoken')

async function identifyUser(req, res, next){
    let token = req.cookies.token
    
    // Also check for token in Authorization header
    if (!token) {
        const authHeader = req.headers.authorization
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.slice(7)
        }
    }

    if(!token){
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({
                message: "Inavlid token"
            })
        }
        const user = await UserModel.findOne({ _id: decoded.id })
        if(!user){
            return res.status(401).json({
                message: "Unauthorized access"
            })
        }
        req.user = user 
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
            error: error.message
        })
    }
}

module.exports = identifyUser