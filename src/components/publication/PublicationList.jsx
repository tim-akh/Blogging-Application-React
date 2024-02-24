import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicationList = () => {

  const Auth = useAuth()
  const user = Auth.getUser()
  const isUser = user.role === 'USER'

  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const fetchPublications = async () => {
      const result = await axios.get(`http://localhost:8080/api/v1/publications`);
      setPublications(result.data);
    };
    fetchPublications();
  }, []);

  return (
    <div>

      <h2>Publications List</h2>
      <ul>
        {publications.map(publication => (
          <li key={publication.id}>
            <Link to={`/publications/${publication.id}`}>{publication.header}</Link>
          </li>
        ))}
      </ul>
      <Link to="/publications/new">Create New Publication</Link>
    </div>
  );
};

export default PublicationList;