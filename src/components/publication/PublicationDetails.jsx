import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicationDetails = () => {

  const Auth = useAuth()
  const authUser = Auth.getUser()
  const isRoleUser = authUser.role === 'USER'

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


  if (!publication) {
    return <div>Loading...</div>;
  }
  
  const formatDate = (dateISOString) => {
    var date = new Date(Date.parse(dateISOString))
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" +
     date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
  }

  return (
    <div>
      {authUser.username === publication.user.username &&
        <Link to={"/publications/" + publication.id + "/edit"}>Edit publication</Link>
      }
      <p>Author: {publication.user.username}</p>
      <p>{formatDate(publication.createdAt)}</p>
      <h2>{publication.header}</h2>
      <p>{publication.content}</p>
    </div>
  );
};

export default PublicationDetails;