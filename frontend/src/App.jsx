import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar';
import PostDetails from './components/PostDetails';
import Login from './pages/Login'; 

// Define components for each page
const Post = () => <h1>Post Page</h1>;
const Blogs = () => <h1>Blogs Page</h1>;
const Profile = () => <h1>Profile Page</h1>;
//const Login = () => <h1>Login Page</h1>;

// Component for rendering the entire blog
const Blog = () => {
  // Dummy data for blog posts (replace this with actual data)
  const posts = [
    {
      _id: 1,
      title: 'Journey Through Nature\'s Symphony',
      content: 'Embark on a journey through lush forests and serene meadows. Witness sunlight filtering through leaves, listen to birdsong, and feel the breeze against your skin.',
      like_count: 10,
      num_comments: 5,
      date_posted: '2024-03-29'
    },
    {
      _id: 2,
      title: 'Embracing Mindfulness in Daily Life',
      content: 'In the hustle and bustle of modern life, practice mindfulness for peace and presence. Savor coffee aromas, feel earth underfoot during leisurely strolls, and embrace moments with intention.',
      like_count: 15,
      num_comments: 7,
      date_posted: '2024-03-28'
    },
    {
      _id: 3,
      title: 'Unleashing Creativity Through Writing',
      content: 'Dive into imagination\'s realms with words. Paint vibrant landscapes of thought and emotion. Each pen stroke uncovers hidden treasures within the soul.',
      like_count: 20,
      num_comments: 3,
      date_posted: '2024-03-27'
    }
  ];

  return (
    <div className="blog">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-feed">
        <h1>Posts</h1>
        {posts.map(post => (
          <PostDetails key={post._id} post={post} />
        ))}
      </div>
      <div className="search-bar">
        <SearchBar />
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          {/* Navigation Links */}
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/post">Post</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/Login">Log In</Link></li>
            </ul>
          </nav>
          {/* Routes */}
          <Routes>
            <Route path="/" element={<Blog />} />
            <Route path="/post" element={<Post />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;