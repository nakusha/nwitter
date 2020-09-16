import { AuthService } from "fbase";
import React from "react";
const Home = () => {
  return(
    <div>
      <button onClick={() => {AuthService.signOut()}}>Sign Out</button>
    </div>
  )
}

export default Home;