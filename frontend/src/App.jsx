// import axios from "axios";
import { useState ,useEffect } from 'react'
import api from './api';
import './App.css'
import user from "./assets/UserProfilePic.png"
import CommentsPage from './pages/CommentsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  const [page,setPage] = useState("RegisterPage");
  return (
    <>
      <button onClick={()=>{setPage("RegisterPage")}}>Register</button>
      <button onClick={()=>{setPage("LoginPage")}}>Login</button>
      <button onClick={()=>{setPage("CommentsPage")}}>Comments</button>

      {page == "RegisterPage" && <RegisterPage/>}
      {page == "LoginPage" && <LoginPage/>}
      {page == "CommentsPage" && <CommentsPage/>}
    </>
  )
}

export default App
