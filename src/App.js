import React from 'react';
import './App.css';
import Navbar from './features/navbar/Navbar';
import Feed from './features/posts/Feed';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Feed />
    </div>
  );
}

export default App;