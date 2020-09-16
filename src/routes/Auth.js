import { AuthService, firebaseInstance } from "fbase";
import React, { useState } from "react";

//Persistence (로그인 유지 상태 확인)

const Auth = () => { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) =>{
    const { target : {name, value}} = event;
    if (name === "email"){
      setEmail(value);
    }else if (name ==="password"){
      setPassword(value);
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount){
        // Create Account
        data = await AuthService.createUserWithEmailAndPassword(email, password)
      }else{
        // Login
        data = await AuthService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    }catch(error){
      var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          console.log('The password is too weak.');
        } else {
          setError(error.message);
        }
        console.log(error);
    }
  }

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event) => {
    const {target:{name}} = event;
    let provider;
    if (name === "google"){
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }else if (name === "twitter"){
      provider = new firebaseInstance.auth.TwitterAuthProvider();
    }
    const data =await AuthService.signInWithPopup(provider);
    console.log(data);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}/>
        <input name="password" type="password" placeholder="password" required value={password} onChange={onChange}/>
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <div>
        <button name="google" onClick={onSocialClick}>Continue with Google</button>
        <button name="twitter" onClick={onSocialClick}>Continue with Twitter</button>
      </div>
    </div>
  )
};

export default Auth