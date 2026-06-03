const followModel = require('../models/Follow.model')
const UserModel = require('../models/User.model')

async function followUser(req, res){
    try {
        const followerId = req.user._id 
        const followingId = req.params.id

        if(!followerId || !followingId){
            return res.status(404).json({
                message: "User not found"
            })
        }

        const follower = await UserModel.findById( followerId )
        const following = await UserModel.findById( followingId )

        if(!follower || !following){
            return res.status(404).json({
                message: "User not exists"
            })
        }

        const follow = await followModel.create({
            follower: followerId,
            following: req.params.id
        })

        return res.status(201).json({
            message: "User followed",
            follow
        })
    } catch(error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function unfollowUser(req, res){
    try {
        const followerId = req.user._id 
        const followingId = req.params.id 

        if(!followerId || !followingId){
            return res.status(404).json({
                message: "User not found"
            })
        }

        const unfollow = await followModel.findOneAndDelete({
            follower: followerId,
            following: followingId
        })

        return res.status(200).json({
            message: "User unfollowed"
        })
    } catch(error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function getFollowers(req, res){
    try {
        const userId = req.params.id
        const followers = await followModel.find({ following: userId })
            .populate('follower', 'username avatar')
        
        return res.status(200).json({
            message: "Followers fetched",
            totalFollowers: followers.length,
            followers
        })
    } catch(error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

async function getFollowing(req, res){
    try {
        const userId = req.params.id
        const following = await followModel.find({ follower: userId })
            .populate('following', 'username avatar')
        
        return res.status(200).json({
            message: "Following fetched",
            totalFollowing: following.length,
            following
        })
    } catch(error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

module.exports = {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing
}