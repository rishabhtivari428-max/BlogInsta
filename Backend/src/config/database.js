const mongoose = require('mongoose')

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to Database")
        })
    } catch (error) {
        console.log("Database connection error: ", error)
    }
}

module.exports = connectDB