const asynHandler = require("express-async-handler")

const getNotes = asynHandler(async(req, res) => {
    res.status(200).json({message: "get notes"})
})

const createNote = asynHandler(async(req, res) => {
    if(!req.body.note) {
        res.status(400)
        throw new Error('Please add a note')
    }
    res.status(200).json({message: "create notes"})
})

const updateNote = asynHandler(async(req, res) => {
    res.status(200).json({message: `update note ${req.params.id}`})
})

const deleteNote = asynHandler(async(req, res) => {
    res.status(200).json({message: `delete note ${req.params.id}`})
})

module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
}