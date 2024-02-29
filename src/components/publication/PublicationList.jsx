import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicationList = () => {

  const Auth = useAuth()
  const isAuthenticated = Auth.userIsAuthenticated()

  var isRoleUser = false;
  var isRoleAdmin = false;

  const authUser = Auth.getUser()
  if (isAuthenticated) {
    isRoleUser = authUser.role === 'USER'
    isRoleAdmin = authUser.role === 'ADMIN'
  }

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
            <span> Rating: {publication.votes.map(vote => vote.dynamic).reduce((partialSum, a) => partialSum + a, 0)}</span>
          </li>
        ))}
      </ul>
      {isAuthenticated &&
      <Link to="/publications/new">Create New Publication</Link>
      }
    </div>
  );
};

export default PublicationList;