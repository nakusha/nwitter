import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import {AuthService} from "../fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.currentUser);
  useEffect(() => {
    AuthService.onAuthStateChanged((user) => {
      if (user){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true)
    })
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing..."}
      
      <footer>&copy; {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
