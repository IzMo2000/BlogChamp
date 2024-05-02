import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { UserFacade, PostFacade } from '../pages/Facades.js';
import { useParams } from 'react-router-dom';
import PostDetails from '../components/PostDetails';
import './IndividualBlog.css';

const IndividualBlog = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const [error, setError] = useState(null);

    // use effect to fetch user 
    useEffect(() => {
        // Retrieve username from local storage        
        const fetchUser = async () => {
          try {
            // Use stored username to fetch user data
            const response = await UserFacade.fetchUserByUsername(username);
            console.log("THIS IS THE RESULT OF FETCH BY USERNAME: ", response);
            setUser(response);
          } catch (error) {
            setError(error.message);
          }
        };
        fetchUser();
    }, [username]);

    // use effect to fetch posts 
    useEffect(() => {
        const fetchPosts = async (user) => {
            try{
              console.log("THIS IS THE RESULT IN FETCH POSTS: ", user._id);
              const post_response = await PostFacade.fetchPostsByUserID(user._id);
              console.log("THESE ARE THE POSTS: ", post_response);
              setPosts( post_response );
            } catch (error) {
                setError(error.message);
            } 
            }
        fetchPosts(user);
        
    }, [user]);


    return (
        <div className="blogPosts">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="main-content">
          <h1>{user && user.username}'s Blog Posts</h1>
            {/* Check if posts array is not null or empty */}
            {posts && posts.length > 0 ? (
            // Filter posts to include only those with non-null blog_id
            posts.filter(post => post.blog_id !== null).length > 0 ? (
                posts.slice().reverse().map((post) => (
                // Display the post only if blog_id is not null
                post.blog_id != null && (
                    <PostDetails key={post._id} post={post} />
                )
                ))
            ) : (
                <p>Nothing to see here yet! Come back soon!</p>
            )
            ) : null}
          </div>
        </div>
      );

};

export default IndividualBlog;