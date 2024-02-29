import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CommentCreate = ({ publication }) => {

    const Auth = useAuth()
    const authUser = Auth.getUser()
    const isRoleUser = authUser.role === 'USER'
  
    const [content, setContent] = useState('');
    const navigate = useNavigate();
  
  
    
    const handleSubmit = (event) => {
        //event.preventDefault();
        axios.post(`http://localhost:8080/api/v1/comments/`, {
          "content": content,
          "publication": publication,
          "user": authUser
        });
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