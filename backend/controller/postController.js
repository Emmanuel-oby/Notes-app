const getPosts = (req, res) => {
    res.status(200).json({message: "get posts"})
}

const createPost = (req, res) => {
    res.status(200).json({message: "create posts"})
}

const updatePost = (req, res) => {
    res.status(200).json({message: `Update post ${req.params.id}`})
}

const deletePost = (req, res) => {
    res.status(200).json({message: `Delete post ${req.params.id}`})
}
module.exports = {
    getPosts, 
    createPost,
    updatePost,
    deletePost,
}