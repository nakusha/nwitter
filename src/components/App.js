import React, { useState } from 'react';
import Router from './Router';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <>
      <Router isLoggedIn={isLoggedIn}/>
      <footer>&copy; {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
