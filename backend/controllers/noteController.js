const asynHandler = require("express-async-handler");
const Note = require("../models/noteModel");
const User = require("../models/userModel");

const getNotes = asynHandler(async (req, res) => {
	const notes = await Note.find({ user: req.user.id });
	res.status(200).json(notes);
});

const getNotesByCategory = asynHandler(async (req, res) => {
	const notes = await Note.find({ user: req.user.id, category: req.params.category });
	res.status(200).json(notes);
});

const getNote = asynHandler(async (req, res) => {
	const note = await Note.findById(req.params.id);
	if (!note) {
		res.status(400);
		throw new Error("Note not found");
	}
	res.status(200).json(note);
})

const createNote = asynHandler(async (req, res) => {
	if (!req.body.title && !req.body.body) {
		res.status(400);
		throw new Error("Please add text");
	}
	const note = await Note.create({
		title: req.body.title,
		body: req.body.body,
		user: req.user.id,
		category: req.body.category
	});
	res.status(200).json(note);
});

const updateNote = asynHandler(async (req, res) => {
	const note = await Note.findById(req.params.id);

	if (!note) {
		res.status(400);
		throw new Error("Note not found");
	}

	const user = await User.findById(req.user.id);
	// check for user
	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}

	// make sure the logged in user matches the keepNotes user
	if (note.user.toString() !== user.id) {
		res.status(401);
		throw new Error("user not authorized");
	}

	const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(200).json(updatedNote);
});

const deleteNote = asynHandler(async (req, res) => {
	const note = await Note.findById(req.params.id);

	if (!note) {
		res.status(400);
		throw new Error("Note not found");
	}

	const user = await User.findById(req.user.id);
	// check for user
	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}

	// make sure the logged in user matches the keepNotes user
	if (note.user.toString() !== user.id) {
		res.status(401);
		throw new Error("user not authorized");
	}

	await note.remove();
	res.status(200).json({ id: req.params.id }); 
});

module.exports = {
	getNotes,
	getNotesByCategory,
	getNote,
	createNote,
	updateNote,
	deleteNote,
};
