const asynHandler = require("express-async-handler")
const Note = require("../models/noteModel")

const getNotes = asynHandler(async(req, res) => {
    const notes = await Note.find()
    res.status(200).json(notes)
})

const createNote = asynHandler(async(req, res) => {
    if(!req.body.title || !req.body.body) {
        res.status(400)
        throw new Error('Please add text')
    }
    const note = await Note.create({
        title: req.body.title,
        body: req.body.body
    })
    res.status(200).json(note)
})

const updateNote = asynHandler(async(req, res) => {
    const note = await Note.findById(req.params.id)

    if(!note) {
        res.status(400)
        throw new Error('Note not found')
    }

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedNote)
})

const deleteNote = asynHandler(async(req, res) => {
    const note = await Note.findById(req.params.id)

    if(!note) {
        res.status(400)
        throw new Error('Note not found')
    }

    await note.remove()
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
}