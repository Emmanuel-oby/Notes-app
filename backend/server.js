const express = require("express")
const colors = require("colors")
const dotenv = require("dotenv").config()
const { errorHandler } = require("./middleware/errorMiddleware")
const {connectDB} = require("./config/db")
const PORT = process.env.PORT || 3000

connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/notes", require("./routes/noteRoutes"))
app.use("/api/users", require("./routes/userRoutes"))

app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})