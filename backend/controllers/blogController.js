const Blog = require('../models/blogModel')
const mongoose = require('mongoose')

// get all blogs
const getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).sort({createdAt: -1})

  res.status(200).json(blogs)
}

// get all posts within a blog
const getPostsFromBlog = async (req, res) => {
  const {id} = req.params
  console.log(req.params)
  const posts =  await Post.find({blog_id : id})

  res.status(200).json(posts)
}

// get a single blog
const getBlog = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such blog, invalid ID format'})
  }

  const workout = await Blog.findById(id)

  if (!workout) {
    return res.status(404).json({error: 'No such blog, blog not found'})
  }

  res.status(200).json(workout)
}


// create a single blog
const createBlog = async (req, res) => {
  const {user, title, contents, creation_date} = req.body
  
  // add post to db
  try {
    const blog = await Blog.create({user, title, contents, creation_date})
    res.status(200).json(blog)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a blog
const deleteBlog = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such blog, invalid ID format'})
  }

  const workout = await Blog.findOneAndDelete({_id: id})

  
  if (!workout) {
    return res.status(404).json({error: 'No such blog, post not found'})
  }

  res.status(200).json(workout)
}

// update a blog
const updateBlog = async (req, res) => {

  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such blog, invalid ID format'})
  }

  const workout = await Blog.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  
  if (!workout) {
    return res.status(404).json({error: 'No such blog, post not found'})
  }

  res.status(200).json(workout)
}

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  deleteBlog,
  updateBlog,
  getPostsFromBlog
}
