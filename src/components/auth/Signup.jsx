import React, { useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const Signup = () => {
  const Auth = useAuth()
  const isLoggedIn = Auth.userIsAuthenticated()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const signup = (user) => {
    return axios.post("http://localhost:8080/api/v1/auth/signup", user, {
      headers: { 'Content-type': 'application/json' }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!(username && password && confirmedPassword && email)) {
      setIsError(true)
      setErrorMessage('Please, inform all fields!')
      return
    }

    if (password !== confirmedPassword) {
      setIsError(true)
      setErrorMessage('The passwords you entered do not match!')
      return
    }


    const user = { username, password, email }

    try {
      const response = await signup(user)
      console.log(response.data)
      const { id, role } = response.data
      //const authdata = window.btoa(username + ':' + password)
      //const authenticatedUser = { id, role, authdata }
      const authenticatedUser = { id, role, username }

      Auth.userLogin(authenticatedUser)

      setUsername('')
      setPassword('')
      setConfirmedPassword('')
      setEmail('')
      setIsError(false)
      setErrorMessage('')
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data
        let errorMessage = 'Invalid fields'
        if (errorData.status === 409) {
          errorMessage = errorData.message
        } else if (errorData.status === 400) {
          errorMessage = errorData.errors[0].defaultMessage
        }
        setIsError(true)
        setErrorMessage(errorMessage)
      }
    }


  }

  if (isLoggedIn) {
    return <Navigate to='/publications' />
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
        /><br />
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
        <input
            type="password"
            placeholder="Confirm password"
            value={confirmedPassword}
            onChange={e => setConfirmedPassword(e.target.value)}
        /><br />
        <button type="submit">Submit</button>
      </form>
      <span>Already have an account? </span>
        <NavLink to="/login" as={NavLink} color='teal'>Login</NavLink><br />
        {isError && errorMessage}
    </div>

  )
}

export default Signup