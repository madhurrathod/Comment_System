import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../utils/constants";

const LoginPage = (prop) => {
  const [user, setUser] = useState({
      username:"" , 
      password: ""
    })

  const handleInput = (e) =>{
    const {name,value} = e.target;
    setUser({
        ...user,
        [name]:value
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    // console.log("login details", user);
    try{
      const result = await axios.post(`${BACKEND_URL}/auth/login`, user,{
        headers: {"Content-Type":"application/json"},
        withCredentials:true
        }
      )
      console.log(result);
      prop.setPage("CommentsPage");

    }
    catch{
      alert("Register First");
    }

  }

  useEffect(()=>{
    console.log(user);
  },[user])

  return (
  <>
    <h2>Login To GET Token</h2>
        <div>
            <form onSubmit={handleSubmit}>
                Name <input type="text" name="username" onChange={(e)=>{handleInput(e)} }/>
                <br></br>
                Password <input type="password" name= "password" onChange={(e)=>{handleInput(e) }}/>
                <input type="submit"/>
            </form>
        </div>
    </>
  )
}

export default LoginPage;