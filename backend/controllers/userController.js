const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");



const registerUser = asyncHandler(async (req, res)=>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please add all fields")
    }

    const userExist = await User.findOne({email})

    // check if user exist
    if(userExist){
        res.status(400)
        throw new Error("User already exist!");
    }


    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error("Invalid user data")
    }
})

const loginUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body

    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
})

const getUser = asyncHandler(async(req, res)=>{
    res.status(200).json({message: "display user data!"})
})

// Generate token

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })
}


module.exports = {
    registerUser,
    loginUser,
    getUser
}