import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CommentEdit = () => {

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
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComment = async () => {
      const result = await axios.get(`http://localhost:8080/api/v1/comments/${id}`);
      setComment(result.data);
      setContent(result.data.content);
    };
    fetchComment();
  }, [id]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.put(`http://localhost:8080/api/v1/comments/${id}`, {
      "content": content
    });
    navigate("/publications/" + comment.publication.id);
  };

  if (!comment) {
    return <div>Loading...</div>;
  }

  if (authUser.username !== comment.user.username) {
    return <div>No access</div>
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      /><br />
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default CommentEdit;