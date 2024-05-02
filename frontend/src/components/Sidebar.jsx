import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import '../pages/Facades.js'
import { PostFacade, BlogFacade } from '../pages/Facades.js';

const Sidebar = () => {
  const navigate = useNavigate();

  // Retrieve username from local storage
  const storedUserId = localStorage.getItem('user_id');

  // sign out function 
  const signOut = async () => {
    // api get method 
    try {
      const response = await fetch("http://localhost:4000/logout", {
        method: "GET",
        credentials: "include",
      });

      // if good response 
      if (response.status === 200) {
        navigate("/");
      }
      // else, display error message 
      else {
        console.error("Failed to sign out");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [addToBlog, setAddToBlog] = useState(false)

  // open create post dialog 
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  // handle change sto check box 
  const handleCheckboxChange = (event) => {
    setAddToBlog(event.target.checked)
  }

  // close the create post box 
  const closeDialog = () => {
    setIsDialogOpen(false);
    // Clear post title and content when closing the dialog
    setPostTitle('');
    setPostContent('');
  };

  // handle change to post content and title 
  const handlePostTitleChange = (event) => {
    setPostTitle(event.target.value);
  };

  const handlePostContentChange = (event) => {
    setPostContent(event.target.value);
  };

  // handle submitting post 
  const handleSubmit = async (event) => {
    event.preventDefault();
    let blog_id

    // check if post being added to blog 
    if (addToBlog) {
      // fetch user's blog 
      const blog = await BlogFacade.fetchBlogByUserid(storedUserId)

      // log the current blog 
      console.log(blog._id)
      blog_id = blog._id
    }

    // else, not adding to blog so set blog id to null 
    else {
      blog_id = null
    }

    // create post data structure 
    const postData = {
      like_count: 0, // Default value for like count
      num_comments: 0, // Default value for number of comments
      date_posted: new Date().toISOString(), // Current date and time
      // Include any other necessary data here, such as user ID or blog ID
      user_id: storedUserId, // Replace with the actual user ID
      content: postContent,
      title: postTitle,
      blog_id: blog_id, // Replace with the actual blog ID
    };

    console.log("postData:", postData);

    // create post using facade 
    PostFacade.createPost(postData)
  
    // After handling submission, close the dialog
    closeDialog();
  };

  return (
    // master sidebar class 
    <div className="sidebar">
      <Link to="/post" className="sidebar-button">Posts</Link>
      <Link to="/blog" className="sidebar-button">Blogs</Link>
      {/* Pass the username as a parameter to the profile page */}
      <Link to={`/profile/${storedUserId}`} className="sidebar-button">Profile</Link>
      <Link to="/" onClick={signOut} className="sidebar-button">Logout</Link>
      <Link className="sidebar-button" onClick={openDialog}>Create Post</Link>
    {/* Create Post Box */}
    {isDialogOpen && (
        <div className="dialog">
          <div>
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
            {/* Get post title  */}
            <input
                type="text"
                value={postTitle}
                onChange={handlePostTitleChange}
                placeholder="Enter post title..."
                required
              />
              {/* Get post content  */}
              <input
                type = "text"
                value={postContent}
                onChange={handlePostContentChange}
                placeholder="Enter your post content here..."
                required
              />
              {/* Check for blog  */}
              <input className='blog-check'
                type="checkbox"
                checked={addToBlog}
                onChange={handleCheckboxChange}
              />
              <label >Add to Blog</label>

              <div style={{ marginBottom: '10px' }}>
                <button className="sidebar-button">Submit</button>
                <button className="sidebar-button" onClick={closeDialog}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;