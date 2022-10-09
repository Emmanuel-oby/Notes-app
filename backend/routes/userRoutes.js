const express = require("express")
const router = express.Router()
const {registerUser} = require("../controller/userController")

router.post("/", registerUser)

module.exports = router