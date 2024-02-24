import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicationEdit = () => {

  const Auth = useAuth()
  const authUser = Auth.getUser()
  const isRoleUser = authUser.role === 'USER'

  const { id } = useParams();
  const [publication, setPublication] = useState(null);
  const [header, setHeader] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublication = async () => {
      const result = await axios.get(`http://localhost:8080/api/v1/publications/${id}`);
      setPublication(result.data);
      setHeader(result.data.header);
      setContent(result.data.content);
    };
    fetchPublication();
  }, [id]);


  const handleDelete = async () => {
    await axios.delete(`http://localhost:8080/api/v1/publications/${id}`);
    navigate("/users/" + authUser.username);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.put(`http://localhost:8080/api/v1/publications/${id}`, {
      "header": header,
      "content": content,
      "user": authUser
    });
    navigate("/users/" + authUser.username);
  };

  if (!publication) {
    return <div>Loading...</div>;
  }

  if (authUser.username !== publication.user.username) {
    return <div>No access</div>
  }

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
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
    </div>
  );
};

export default PublicationEdit;