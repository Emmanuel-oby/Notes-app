const mongoose = require("mongoose");
const express = require("express")
const app = express()

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongodb connected: ${conn.connection.host}`.cyan.underline);
        if (process.env.NODE_ENV == "production") {
            app.use(express.static("frontend/build"));
            const path = require("path");
            app.get("*", (req, res) => {
              res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
            });
        }

    } catch (error){
        console.log(error);
        process.exit(1)
    }
}

module.exports = {
    connectDB,
}