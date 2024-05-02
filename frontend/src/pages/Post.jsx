// Post.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import PostDetails from '../components/PostDetails';
import './Post.css'; // Import the CSS file
import { useEffect, useState } from 'react'
import { PostFacade } from './Facades';

// fetch all posts 
const Post = () => {
  const [posts, setPosts] = useState(null)
  
  useEffect(() => {

    const fetchPosts = async () => {
      try {
        const response = await PostFacade.fetchAllPosts();
        setPosts(response)
      } catch (error) {
        setError(error.message);
      }
    }
    fetchPosts()
  });
  

  return (
    <div className="post">
      {/* display sidebar */}
      <div className="sidebar">
        <Sidebar />
      </div>
      {/* display all posts  */}
      <div className="main-content">
        <h1>Posts</h1>
        {/* Check if posts array is not null or empty */}
        {posts && posts.length > 0 && (
          // reverse list so newest posts are on top of page 
          posts.slice().reverse().map((post) => (
            // Display the post only if blog_id is null
            post.blog_id == null && (
              <PostDetails key={post._id} post={post} />
            )
          ))
        )}
      </div>
    </div>
  );
};

export default Post;
