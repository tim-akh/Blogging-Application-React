import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PublicationForm = ({ publication, onSubmit }) => {
  const [header, setHeader] = useState(publication ? publication.header : '');
  const [content, setContent] = useState(publication ? publication.content : '');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:8080/api/v1/publications`, {
      "header": header,
      "content": content
    })
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Header"
        value={header}
        onChange={e => setHeader(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PublicationForm;