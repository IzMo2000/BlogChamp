import React, { useState, useEffect } from 'react';
import './Comments.css';
import Sidebar from '../components/Sidebar';
import { CommentFacade, UserFacade } from '../pages/Facades.js';
import { useParams } from 'react-router-dom';

const Comments = () => {
  // initialize variables
  const { post_id } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  // get the local user id
  const storedUserId = localStorage.getItem('user_id');

  const fetchComments = async () => {
    try {
      // fetch the comments from the post id
        // from Comments Facade
      const response = await CommentFacade.fetchComments(post_id);
      // sort the comments with the newest at the front
      const sortedComments = response.sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted));

      // set the fetched comments as a variable
      setComments(sortedComments);

      // catch error for fetching comments
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // consistently grab the comments
  useEffect(() => {
    fetchComments();
  }, [post_id]);
  
  useEffect(() => {
    // get the users that posted each comment
    const fetchUsersForComments = async () => {
      try {
        if (comments) {
          // update the comments
          const updatedComments = await Promise.all(comments.map(async (comment) => {
            if (!comment.user) {
              // get the user id for the comments
              const userData = await UserFacade.fetchUserByUserid(comment.user_id);
              return { ...comment, user: userData };
            }
            return comment;
          }));

          // set the comments as a variable
          setComments(updatedComments);
        }

      // catch any errors
      } catch (error) {
        setError(error.message);
      }
    };
  
  // call the function
    fetchUsersForComments();
  }, [comments]);

  // open the dialogue
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setCommentContent('');
  };

  // set the comment content for the comments
  const handleCommentContentChange = (event) => {
    setCommentContent(event.target.value);
  };

  // function for submitting a comment
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
  
    // comment data variables
    const commentData = {
      date_posted: new Date().toISOString(),
      post_id: post_id,
      content: commentContent,
      user_id: storedUserId
    };
  
    try {
      // create a comment under the given post id
      await CommentFacade.createComment(post_id, commentData);
      closeDialog();
      // fetch the comment
      fetchComments();

      // catch error for creating comment
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };
  

  // set up for css
  return (
    <div className="comments-container">
    {/*Set up the side bar on the left */}
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content">
        {/*Create a comment input */}
        <div className="create-comment">
          <button className="comment-button" onClick={openDialog}>Create Comment</button>
          {isDialogOpen && (
            <div className="dialog">
              <div className="create-comment-form">
                <h3>Create Comment</h3>
                <form onSubmit={handleCommentSubmit}>
                  <input
                    type="text"
                    value={commentContent}
                    onChange={handleCommentContentChange}
                    placeholder="Enter your comment..."
                    required
                  />
                  <div className="buttons">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={closeDialog}>Close</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        <div className="comments-list">
          {loading ? (
            <p>Loading...</p> // Display loading message while comments are being fetched
          ) : comments && comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="comment">
                {/*Show the author for each comment and the comment content */}
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
