import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicationCreate = () => {

    const Auth = useAuth()
    const isAuthenticated = Auth.userIsAuthenticated()

    var isRoleUser = false;
    var isRoleAdmin = false;
  
    const authUser = Auth.getUser()
    if (isAuthenticated) {
      isRoleUser = authUser.role === 'USER'
      isRoleAdmin = authUser.role === 'ADMIN'
    }
  
    const [header, setHeader] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login')
      } 

    }, []);


  
    
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post(`http://localhost:8080/api/v1/publications`, {
        "header": header,
        "content": content,
        "user": authUser
      })
      navigate("/users/" + authUser.username);
    };
  
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Header"
          value={header}
          onChange={e => setHeader(e.target.value)}
        /><br />
        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
        /><br />
        <button type="submit">Submit</button>
      </form>
    );
  };

export default PublicationCreate;