const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'E-Mail is required'],
        unique: [true, 'E-Mail must be unique']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/qc10ifg2p/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.webp?updatedAt=1775462649735"
    }
}, {timestamps: true})

const UserModel = new mongoose.model('users', UserSchema)

module.exports = UserModel