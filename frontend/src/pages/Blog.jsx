// BlogsPage.jsx
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { UserFacade, FriendFacade, PostFacade } from './Facades.js';
import './Blog.css';

const Blogs = () => {
  const [user, setUser] = useState(null);
  const [friendUsernames, setUsernames] = useState(null);
  const [error, setError] = useState(null);
  const [friends, setFriends] = useState(null);
  const { username } = useParams();


  // use effect to get users 
  useEffect(() => {
    // Retrieve username from local storage
    const storedUserId = localStorage.getItem('user_id');
    
    const fetchUser = async () => {
      try {
        // Use stored username to fetch user data
        const response = await UserFacade.fetchUserByUserid(storedUserId);
        console.log(response);
        setUser(response);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUser();

    // fetch friends 
    const fetchFriendsIds = async () => {
      try {
        // Use stored username to fetch user data
        const friend_id = await FriendFacade.fetchFriendsByUserid(storedUserId);
        console.log('friend_response: ', friend_id);
        
        // Extract friend IDs from the response
        const friendIds = friend_id.map(friend => friend.user_two); // Assuming user_two contains the friend's ID
        
        // Set the friend IDs in state or use them as needed
        setFriendsIds(friendIds);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchFriendsIds();

    const fetchFriends = async () => {
      try {
        // Use stored username to fetch user data
        const friend_response = await FriendFacade.fetchFriendsByUserid(storedUserId);
        console.log('friend_response: ', friend_response);
        setFriends(friend_response);
        // Once friends are fetched, call the function to fetch usernames
        const usernames = await fetchUsernamesForFriends(friend_response);
        setUsernames(usernames);
      } catch (error) {
        setError(error.message);
      }
    };
    
    const fetchUsernamesForFriends = async (friendList) => {
      try {
        const usernames = [];
        for (const friend of friendList) {
          // Fetch username for each friend ID
          const user = await UserFacade.fetchUserByUserid(friend.user_two);
          usernames.push(user.username);
        }
        console.log('Usernames for friends:', usernames);
        return usernames;
      } catch (error) {
        setError(error.message);
        return []; // Return an empty array in case of error
      }
    };
    
    fetchFriends(); 
  }, []);

  return (
    <div className="post">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content"> {/* Update class name */}
        <h1>Blog</h1>
        <div>
          {/* Render user's username with line separator */}
          <div>
            <p>User: {user && user.username}</p>
            <Link to={`/user/${user && user.username}`}>
              <button className='blog-button'>View Blog</button>
            </Link>
          </div>
          <hr /> {/* Add line separator after the user's username */}
          
          {/* Render friend usernames with lines in between */}
          {friendUsernames && friendUsernames.map((friendUsername, index) => (
            <React.Fragment key={index}>
              <div>
                <p>Friend: {friendUsername}</p>
                <Link to={`/user/${friendUsername}`}>
                  <button className='blog-button'>View Blog</button>
                </Link>
              </div>
              {index !== friendUsernames.length - 1 && <hr />} {/* Add line separator if it's not the last friend */}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
