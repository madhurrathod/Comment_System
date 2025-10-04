import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { BACKEND_URL } from "../utils/constants.js"


const RegisterPage = (prop) => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
        console.log(user);

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("User: ", user)
        const result = await axios.post(`${BACKEND_URL}/auth/signup`, user, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })

        prop.setPage("LoginPage");
        console.log("result: ", result)

        
    }
  return (
    <>
        <h2>Register User</h2>
        <div>
            <form onSubmit={handleSubmit}>
                username <input type="text" id="username" name='username' onChange={handleChange} value={user.username} required/>
                <br></br>
                Email <input type="email" id="email" name='email' onChange={handleChange} value={user.email} required/>
                <br></br>
                Password <input type="password" id="password" name='password' onChange={handleChange} value={user.password} required/>
                <button type = "submit" > submit </button>
                

            </form>
        </div>
    </>
  )
}

export default RegisterPage