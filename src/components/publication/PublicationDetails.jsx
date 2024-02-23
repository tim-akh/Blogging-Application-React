import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PublicationForm from './PublicationForm';

const PublicationDetails = () => {
  const { id } = useParams();
  const [publication, setPublication] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublication = async () => {
      const result = await axios.get(`http://localhost:8080/api/v1/publications/${id}`);
      setPublication(result.data);
    };
    fetchPublication();
  }, [id]);

  const handleDelete = async () => {
    await axios.delete(`http://localhost:8080/api/v1/publications/${id}`);
    navigate("/");
  };

  const handleUpdate = async (updatedPublication) => {
    await axios.put(`http://localhost:8080/api/v1/publications/${id}`, updatedPublication);
    navigate("/");
  };

  if (!publication) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{publication.header}</h2>
      <p>{publication.content}</p>
      <button onClick={handleDelete}>Delete</button>
      <PublicationForm publication={publication} onSubmit={handleUpdate} />
    </div>
  );
};

export default PublicationDetails;