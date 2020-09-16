import { AuthService } from "fbase";
import React, { useState } from "react";

//Persistence (로그인 유지 상태 확인)

const Auth = () => { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

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
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}/>
        <input name="password" type="password" placeholder="password" required value={password} onChange={onChange}/>
        {newAccount ? <input type="submit" value="Create Account"/> : <input type="submit" value="Sign In"/>}
      </form>
      <div>
        <button>Continue with Google</button>
      </div>
    </div>
  )
};

export default Auth