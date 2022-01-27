import React from 'react';
import './App.css';
import Navbar from './features/navbar/Navbar';
import Post from './features/posts/Post';
import redditSlice from './features/reddit/redditSlice';

function App() {
  return (
    <div className="App">
      <Navbar />
      <p>Stuff</p>
      <div className="content-container">

        <div className="feed">
          {/* To do: import posts from post directory */}
          {/* Map post data onto individual post cards, handle undefined values */}
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
        
        <div className="about-the-site">
          {/* To do: add mutable state to class name for this div, */}
          {/* determining whether or not it's active based on the state of */}
          {/* The action dispatched from the searchbar slice(?) */}
          {/* Do I need a searchbar slice? */}
        </div>

      </div>
    </div>
  );
}

export default App;