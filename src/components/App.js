import React, { useState } from 'react';
import AppRouter from 'components/Router';
import {AuthService} from "../fbase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.currentUser);
  
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn}/>
      <footer>&copy; {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
