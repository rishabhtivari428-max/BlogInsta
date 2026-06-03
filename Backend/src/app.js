const express = require('express')
const cookieparser = require('cookie-parser')
const authRouter = require('./routes/auth.routes')
const blogRouter = require('./routes/blogs.routes')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin: ["http://localhost:5173", "https://your-frontend-url.vercel.app"],
    credentials: true
}))

app.get("/", (req, res) => {
    res.send("Backend is running");
})


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/blogs', blogRouter)

module.exports = app