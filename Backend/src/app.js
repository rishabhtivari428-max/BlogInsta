const express = require('express')
const cookieparser = require('cookie-parser')
const authRouter = require('./routes/auth.routes')
const blogRouter = require('./routes/blogs.routes')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.get("/", (req, res) => {
    res.send("Backend is running");
})


app.use('/api/auth', authRouter)
app.use('/api/blogs', blogRouter)

module.exports = app