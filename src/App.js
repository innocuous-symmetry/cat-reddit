import React from 'react';
import './App.css';
import Navbar from './features/navbar/Navbar';
import Feed from './features/posts/Feed';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content-container">

        <div className="feed">
          <Feed />
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