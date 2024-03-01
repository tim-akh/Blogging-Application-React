import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ReportCreate = () => {

    const Auth = useAuth()
    const isAuthenticated = Auth.userIsAuthenticated()

    const location = useLocation()
    const { user } = location.state
    const { publication } = location.state
    const { comment } = location.state

    var isRoleUser = false;
    var isRoleAdmin = false;
  
    const authUser = Auth.getUser()
    if (isAuthenticated) {
      isRoleUser = authUser.role === 'USER'
      isRoleAdmin = authUser.role === 'ADMIN'
    }
  
    const [reason, setReason] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated || isRoleAdmin) {
        navigate('/login')
      } 

    }, []);

    
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:8080/api/v1/reports`, {
            "reason": reason,
            "user": user,
            "publication": publication,
            "comment": comment
        })
        navigate(-1);
    }
  
  
    return (
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Reason"
          value={reason}
          onChange={e => setReason(e.target.value)}
        /><br />
        <button type="submit">Submit</button>
      </form>
    );
};

export default ReportCreate;