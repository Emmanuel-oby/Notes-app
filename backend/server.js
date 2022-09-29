const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.port || 3000

const app = express()

app.use("/api/posts", require("./routes/postRoutes"))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))