import React, { useState, useEffect } from 'react';
import './Comments.css';
import Sidebar from '../components/Sidebar';
import { CommentFacade, UserFacade } from '../pages/Facades.js';
import { useParams } from 'react-router-dom';

const Comments = () => {
  const { post_id } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);

  const storedUserId = localStorage.getItem('user_id');

  const fetchComments = async () => {
    try {
      const response = await CommentFacade.fetchComments(post_id);
      const sortedComments = response.sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted));
      setComments(sortedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching comments
    }
  };
  
  useEffect(() => {
    fetchComments();
  }, [post_id]);
  
  useEffect(() => {
    const fetchUsersForComments = async () => {
      try {
        if (comments) {
          const updatedComments = await Promise.all(comments.map(async (comment) => {
            if (!comment.user) {
              const userData = await UserFacade.fetchUserByUserid(comment.user_id);
              return { ...comment, user: userData };
            }
            return comment;
          }));
          setComments(updatedComments);
        }
      } catch (error) {
        setError(error.message);
      }
    };
  
    fetchUsersForComments();
  }, [comments]);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setCommentContent('');
  };

  const handleCommentContentChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
  
    const commentData = {
      date_posted: new Date().toISOString(),
      post_id: post_id,
      content: commentContent,
      user_id: storedUserId
    };
  
    try {
      await CommentFacade.createComment(post_id, commentData);
      closeDialog();
      fetchComments();
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };
  

  return (
    <div className="comments-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content">
        <div className="create-comment">
          <button className="comment-button" onClick={openDialog}>Create Comment</button>
          {isDialogOpen && (
            <div className="dialog">
              <div className="create-comment-form">
                {/* Create comment form */}
                <h3>Create Comment</h3>
                <form onSubmit={handleCommentSubmit}>
                  <input
                    type="text"
                    value={commentContent}
                    onChange={handleCommentContentChange}
                    placeholder="Enter your comment..."
                    required
                  />
                  {/* Submit comment button */}
                  <div className="buttons">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={closeDialog}>Close</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        {/* Display list of comments for post */}
        <div className="comments-list">
          {loading ? (
            <p>Loading...</p> // Display loading message while comments are being fetched
          ) : comments && comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="comment">
                {comment.user && <p>Author: {comment.user.username}</p>}
                <p>{comment.content}</p>
                <p>Date Posted: {new Date(comment.date_posted).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>No comments available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
