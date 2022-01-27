import React from 'react';
import './App.css';
import Navbar from './features/navbar/Navbar';
import redditSlice from './features/reddit/redditSlice';

function App() {
  return (
    <div className="App">
      <Navbar />
      <p>Stuff</p>
    </div>
  );
}

export default App;