const getNotes = (req, res) => {
    res.status(200).json({message: "get notes"})
}
const createNote = (req, res) => {
    res.status(200).json({message: "create notes"})
}
const updateNote = (req, res) => {
    res.status(200).json({message: `update note ${req.params.id}`})
}
const deleteNote = (req, res) => {
    res.status(200).json({message: `delete note ${req.params.id}`})
}

module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
}