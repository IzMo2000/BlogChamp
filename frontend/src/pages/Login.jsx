import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserFacade, BlogFacade } from './Facades.js'; 
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    async function autoLogin() {
      const response = await fetch("http://localhost:4000/autoLogin", {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 200) {
        navigate("/post");
      } else {
        navigate("/");
      }
    }

    autoLogin();
  }, []);

  const handleLogin = async () => {
    // Check if username and password are valid
    if (username && password) {
      try {
        const user = await UserFacade.fetchUserByUsername(username);
        console.log('user:', user);
        if (user) {
          console.log('User found: ', user.username);
          console.log('Login successful!');
          // post call to api 
          const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-type": "application/json",
            },
            // use user's username and password in api call 
            body: JSON.stringify({
              id: user.username,
              password: user.password,
            }),
          });
          // check for good login
          if (response.status === 200) {
              console.log(user);
              localStorage.setItem('user_id', user._id);
              console.log(user._id);
              // navigate to post page 
              navigate('/Post');
          }
        // else, bad login so throw error
        } else {
          setErrorMessage('User not found. Please enter a valid username.');
        }
      } catch (error) {
        console.error('Error fetching user: ', error);
        setErrorMessage('An error occurred. Please try again later.');
      }
    } else {
      setErrorMessage('Please enter both username and password.');
    }
  };

  // handle sign up 
  const handleSignUp = async () => {
    if (newUsername && newPassword && newEmail) {
      try {
        // Check if the user already exists
        const checkUserResponse = await UserFacade.fetchUserByUsername(newUsername);
        console.log(checkUserResponse);
        if (checkUserResponse.ok) {
            setErrorMessage('Username already exists. Please choose a different one.');
            return;
        }

        // validate email and check for nau.edu 
        const emailRegex = /@nau\.edu$/i;
        // Check if the email matches the regex
        if (!emailRegex.test(newEmail)) {
          setErrorMessage('Please enter a valid NAU email address.');
          return;
        }
  
        // Create a new user if the username is available
        const newUser = new UserFacade(newUsername, newPassword, newEmail, 0, "Enter your bio here!");
        var response = await UserFacade.createUser(newUser);
        const userData = response
        if (response) {
          console.log('User created: ', newUsername);
          console.log('Signup successful!');
            const blogData = {
              user: userData._id,
              title: `${userData.username}'s Blog`,
              contents: "Write your blog info here.",
              creation_date: new Date().toISOString(),
            }
          response = BlogFacade.createBlog(blogData)
          response = await fetch("http://localhost:4000/login", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              id: newUsername,
              password: newPassword,
            }),
          });

          if (response.status === 200) {
            const userData = await UserFacade.fetchUserByUsername(newUsername);
            localStorage.setItem('user_id', userData._id);
            navigate('/Post');
          }
        } else {
          setErrorMessage('Error creating user. Please try again later.');
        }
      } catch (error) {
        console.error('Error adding user: ', error);
        setErrorMessage('An error occurred. Please try again later.');
      }
    } else {
      setErrorMessage('Please enter both username and password.');
    }
  };

  return (
    <div className = 'page'>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className='title'>
        <h1> BlogChamp</h1>
      </div>

      <div className = 'container'>
        {/* login container  */}
        <div className='login'>

          <h2>Login</h2>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>

        </div>

        {/* signup container  */}
        <div className='signup'>

          <h2>Sign Up</h2>
          <input type="text" placeholder="Username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <input type="text" placeholder="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          <button onClick={handleSignUp}>Sign Up</button>

        </div>
      </div>

    </div>
  );
};

export default Login;