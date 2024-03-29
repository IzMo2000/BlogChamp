const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
  like_count: {
    type: Number,
    required: true
  },

  num_comments: {
    type: Number,
    required: true
  },

  date_posted: {
    type: Date,
    required: true
  },

})

module.exports = mongoose.model('Post', postSchema)
