import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PostFacade, CommentFacade } from '../pages/Facades';
import './PostDetails.css'

const PostDetails = ({ post }) => {
  // Parse the date string into a Date object
  const datePosted = new Date(post.date_posted);

  // Get the month, day, and year
  const month = datePosted.toLocaleString('default', { month: 'long' });
  const day = datePosted.getDate();
  const year = datePosted.getFullYear();

  // Concatenate the formatted date
  const formattedDate = `${month} ${day}, ${year}`;

  // State for keeping track of like count
  const [likeCount, setLikeCount] = useState(post.like_count);
  const [numComments, setNumComments] = useState(post.num_comments);

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

// fetch users 
  useEffect(() => {  
    const fetchUser = async () => {
      try {
        // Use stored username to fetch user data
        const response = await fetch(`http://localhost:4000/api/users/id/${post.user_id}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUser();
  }, []);

  console.log(user);

  // Function to handle like button click
  const handleLike = async () => {
    try {
      // Update like count on the server
      await PostFacade.updatePostLikeCount(post._id, likeCount + 1);
      // Update like count locally
      setLikeCount(likeCount + 1);
    } catch (error) {
      console.error('Error updating like count:', error.message);
    }
  };

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        // Fetch the latest comment count for the post from the server
        const updatedPost = await CommentFacade.fetchComments(post._id);
        setNumComments(updatedPost.length);
      } catch (error) {
        console.error('Error fetching comment count:', error.message);
      }
    };

    fetchCommentCount(); // Fetch comment count when the component mounts
  }, [post._id]);

  return (
// master class
<div className="post-details">
  {/* Display post title and user  */}
  <h4>{post.title}</h4>
  {user && <p>Author: {user.username}</p>}

  {/* Display post content */}
  <p className="content">{post.content}</p>

  {/* Display post metadata */}
  <div className="metadata">
    <span>{likeCount} Likes</span>
    <p>{`Comments: ${numComments}`}</p>
  </div>

  {/* Display date posted  */}
  <div className="date-posted">{formattedDate}</div>
  {/* Like and comment buttons */}
  <div className="button-container">
    <button onClick={handleLike} className="like-button">&#128077; Like</button>
    {/* View comments button */}
    <Link to={`/comments/${post._id}`} className="comments-button">
      View Comments
    </Link>
  </div>
</div>

  );
};

export default PostDetails;
