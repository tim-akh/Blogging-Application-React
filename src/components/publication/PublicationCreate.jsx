import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicationCreate = () => {

    const Auth = useAuth()
    const authUser = Auth.getUser()
    const isRoleUser = authUser.role === 'USER'
  
    const [header, setHeader] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
  
  
    
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