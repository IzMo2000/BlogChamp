const Post = require('../models/postModel')
const mongoose = require('mongoose')

// get all posts
const getPosts = async (req, res) => {
  const posts = await Post.find({}).sort({createdAt: -1})

  res.status(200).json(posts)
}


// get a single post
const getPost = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such post, invalid ID format'})
  }

  const workout = await Post.findById(id)

  if (!workout) {
    return res.status(404).json({error: 'No such post, post not found'})
  }

  res.status(200).json(workout)
}


// create a single post
const createPost = async (req, res) => {
  const {like_count, num_comments, date_posted} = req.body
  
  // add post to db
  try {
    const post = await Post.create({like_count, num_comments, date_posted})
    res.status(200).json(post)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a post
const deletePost = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such post, invalid ID format'})
  }

  const workout = await Post.findOneAndDelete({_id: id})

  
  if (!workout) {
    return res.status(404).json({error: 'No such post, post not found'})
  }

  res.status(200).json(workout)
}

// update a post
const updatePost = async (req, res) => {

  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such post, invalid ID format'})
  }

  const workout = await Post.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  
  if (!workout) {
    return res.status(404).json({error: 'No such post, post not found'})
  }

  res.status(200).json(workout)
}

module.exports = {
  createPost,
  getPosts,
  getPost,
  deletePost,
  updatePost
}
