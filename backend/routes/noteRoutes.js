const express = require("express");
const router = express.Router()
const {getNotes, getNotesByCategory, getNote, createNote, updateNote, deleteNote} = require("../controllers/noteController")
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getNotes).post(protect, createNote)
router.route("/:id").get(protect, getNote).put(protect, updateNote).delete(protect, deleteNote)
router.route("/category/:category").get(protect, getNotesByCategory)


module.exports = router