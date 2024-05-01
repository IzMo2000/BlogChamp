// placeholder, this is where you would define routes for fetching from and/or
// uploading to the database.
const express = require('express')
const {
  createFriend,
  getFriends,
  getFriend,
  deleteFriend,
  updateFriend,
  getFriendsByUserid
} = require('../controllers/friendsController')
const router = express.Router()

// GET all friends
router.get('/', getFriends)

// GET a single friend
router.get('/:id', getFriend)

// GET all friends of a user
router.get('/user_id/:id', getFriendsByUserid )

// POST a new friend
router.post('/', createFriend)

// DELETE a friend
router.delete('/:id', deleteFriend)

// UPDATE a friend
router.patch('/:id', updateFriend)

module.exports = router
