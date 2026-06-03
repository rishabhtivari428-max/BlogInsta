require('dotenv').config()
const app = require('./src/app')
const connectDB = require('./src/config/database')

connectDB()

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
