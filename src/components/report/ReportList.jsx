import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminService from '../service/AdminService';

const ReportList = () => {

  const Auth = useAuth()
  const isAuthenticated = Auth.userIsAuthenticated()
  const navigate = useNavigate()

  var isRoleUser = false;
  var isRoleAdmin = false;

  const authUser = Auth.getUser()
  if (isAuthenticated) {
    isRoleUser = authUser.role === 'USER'
    isRoleAdmin = authUser.role === 'ADMIN'
  }

  const [reports, setReports] = useState([]);

  useEffect(() => {
    if (!isRoleAdmin) {
        navigate("/login")
    }
    const fetchReports = async () => {
      const result = await axios.get(`http://localhost:8080/api/v1/reports`);
      setReports(result.data);
    };
    fetchReports();
  }, []);

  const handleClose = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/reports/${id}`);
    window.location.reload();
  };





  return (
    <div>

      <h2>Reports List</h2>
      <h3>Publication reports:</h3>
      <ul>
        {reports.filter(report => report.publication !== null).map(report => (
          <li key={report.id}>
            Reason: {report.reason}|
            User: <Link to={"/users/" + report.user.username}>{report.user.username}</Link>|
            Publication: <Link to={"/publications/" + report.publication.id}>{report.publication.header}</Link>
            {report.user.banned &&
            <button onClick={() =>AdminService.unbanUser(report.user)}>Unban</button>}
            {!report.user.banned &&
            <button onClick={() =>AdminService.banUser(report.user)}>Ban</button>}
            <button onClick={() => handleClose(report.id)}>Close</button>
          </li>
        ))}
      </ul>
      <h3>Comment reports:</h3>
      <ul>
        {reports.filter(report => report.comment !== null).map(report => (
          <li key={report.id}>
            Reason: {report.reason}|
            User: <Link to={"/users/" + report.user.username}>{report.user.username}</Link>|
            Comment: <Link to={"/comments/" + report.comment.id}>{report.comment.content}</Link>
            {report.user.banned &&
            <button onClick={() =>AdminService.unbanUser(report.user)}>Unban</button>}
            {!report.user.banned &&
            <button onClick={() =>AdminService.banUser(report.user)}>Ban</button>}
            <button onClick={() => handleClose(report.id)}>Close</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportList;