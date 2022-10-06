const express = require("express")
const dotenv = require("dotenv").config()
const { errorHandler } = require("./middleware/errorMiddleware")
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use("/api/notes", require("./routes/noteRoutes"))
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})