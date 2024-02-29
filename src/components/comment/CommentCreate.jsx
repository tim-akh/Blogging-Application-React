import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CommentCreate = ({ publication }) => {

    const Auth = useAuth()
    const isAuthenticated = Auth.userIsAuthenticated()

    var isRoleUser = false;
    var isRoleAdmin = false;
  
    const authUser = Auth.getUser()
    if (isAuthenticated) {
      isRoleUser = authUser.role === 'USER'
      isRoleAdmin = authUser.role === 'ADMIN'
    }
  
    const [content, setContent] = useState('');
    const navigate = useNavigate();
  
  
    
    const handleSubmit = (event) => {
        //event.preventDefault();
        if (isAuthenticated) {
          axios.post(`http://localhost:8080/api/v1/comments/`, {
            "content": content,
            "publication": publication,
            "user": authUser
          });
        }
        else {
          navigate("/login")
        }
        //navigate("/publications/" + publication.id);
    };
  
  
    return (
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Your comment..."
          value={content}
          onChange={e => setContent(e.target.value)}
        /><br />
        <button type="submit">Submit</button>
      </form>
    );
  };

export default CommentCreate;