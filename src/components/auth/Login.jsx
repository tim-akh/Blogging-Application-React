import React, { useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const Login = () => {
  const Auth = useAuth()
  const isLoggedIn = Auth.userIsAuthenticated()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)


  const authenticate = (username, password) => {
    return axios.post("http://localhost:8080/api/v1/auth/signin", 
    { username, password }, {
      headers: { "Content-type": "application/json" }
    }
  )};

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!(username && password)) {
      setIsError(true)
      return
    }

    try {
      const response = await authenticate(username, password)
      const { id, role } = response.data
      //const authdata = window.btoa(username + ":" + password)
      //const authenticatedUser = { id, name, role, authdata }
      const authenticatedUser = { id, role, username }

      Auth.userLogin(authenticatedUser)

      setUsername("")
      setPassword("")
      setIsError(false)
    } catch (error) {
      console.log("Login error")
      setIsError(true)
    }
  }

  if (isLoggedIn) {
    return <Navigate to={"/publications"} />
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
        /><br />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
        /><br />
        <button type="submit">Submit</button>
        </form>
        <span>Don't have an account? </span> 
        <NavLink to="/signup" as={NavLink} color='teal'>Sign Up</NavLink><br />
        {isError && "The username or password provided are incorrect!"}
    </div>
  )
}

export default Login;