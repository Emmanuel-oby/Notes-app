const express = require("express")
const router = express.Router()
const {getPosts, createPost, updatePost, deletePost} = require("../controller/postController")

router.route("/").get(getPosts).post(createPost)

router.route("/:id").put(updatePost).delete(deletePost)

module.exports = router