const express = require("express");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv").config();
const path = require("path");
const { errorHandler } = require("./backend/middleware/errorMiddleware");
const PORT = process.env.PORT || 3000;
const app = express();

process.env.NODE_ENV = "production";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongodb connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/notes", require("./backend/routes/noteRoutes"));
app.use("/api/users", require("./backend/routes/userRoutes"));

app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"),
  function(err){
    res.status(500).send(err)
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
