require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

app.use("/api/notes", require("./routes/noteRoutes"))

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
