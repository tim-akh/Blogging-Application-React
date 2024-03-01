import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const CommentDetails = () => {

    const Auth = useAuth()
    const isAuthenticated = Auth.userIsAuthenticated()
    var isRoleUser = false;
    var isRoleAdmin = false;
  
    const authUser = Auth.getUser()
    if (isAuthenticated) {
      isRoleUser = authUser.role === 'USER'
      isRoleAdmin = authUser.role === 'ADMIN'
    }
  
    
  
    const { id } = useParams();
    const [comment, setComment] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login')
      } 
      const fetchComment = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/comments/${id}`);
        setComment(result.data);
      };
      fetchComment();
    }, [id]);


    if (!comment) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>Author: <Link to={"/users/" + comment.user.username}>{comment.user.username}</Link></p>
            <p>Rating: {comment.votes.map(vote => vote.dynamic).reduce((partialSum, a) => partialSum + a, 0)}</p>
            <p>Content: {comment.content}</p>
            <p>Publication: <Link to={"/publications/" + comment.publication.id}>{comment.publication.header}</Link></p>
        </div>
    )

}

export default CommentDetails;