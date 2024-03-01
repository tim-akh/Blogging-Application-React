import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import AdminService from "../service/AdminService";

const UserPage = () => {

    const Auth = useAuth()
    const isAuthenticated = Auth.userIsAuthenticated()

    var isRoleUser = false;
    var isRoleAdmin = false;
  
    const authUser = Auth.getUser()
    if (isAuthenticated) {
      isRoleUser = authUser.role === 'USER'
      isRoleAdmin = authUser.role === 'ADMIN'
    }

    const { username } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
          const result = await axios.get(`http://localhost:8080/api/v1/users/${username}`);
          setUser(result.data);
        };
        fetchUser();
      }, [username]);

    if (!user) {
        return <div>Loading...</div>
    }

    if (!isAuthenticated) {
        return (
            <div>
                <h1>Profile</h1>
                <div>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p> 
                    <p>Banned: {user.banned ? "Yes" : "No"}</p>
                    {
                        user.publications.length === 0 ? "No publications yet" :
                        <div>
                            <p>Publications:</p>
                            <ul>
                                {user.publications.map(publication => (
                                <li key={publication.id}>
                                    <Link to={`/publications/${publication.id}`}>{publication.header}</Link> 
                                    <span> Rating: {publication.votes.map(vote => vote.dynamic).reduce((partialSum, a) => partialSum + a, 0)}</span>
                                </li>
                                ))}
                            </ul>
                        </div>
                    }
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Profile</h1>
                <div>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p> 
                    {isRoleAdmin && user.role === "USER" && 
                    <button onClick={() =>AdminService.makeUserAdmin(user)}>Make ADMIN</button>}
                    {isRoleAdmin && user.role === "ADMIN" &&
                     <button onClick={() =>AdminService.makeUserDefault(user)}>Make USER</button>}
                    <p>Banned: {user.banned ? "Yes" : "No"}</p>
                    {isRoleAdmin && user.banned &&
                     <button onClick={() =>AdminService.unbanUser(user)}>Unban</button>}
                    {isRoleAdmin && !user.banned &&
                     <button onClick={() =>AdminService.banUser(user)}>Ban</button>}<br/>
                    {
                        user.publications.length === 0 ? "No publications yet" :
                        <div>
                            <p>Publications:</p>
                            <ul>
                                {user.publications.map(publication => (
                                <li key={publication.id}>
                                    <Link to={`/publications/${publication.id}`}>{publication.header}</Link> 
                                    <span> Rating: {publication.votes.map(vote => vote.dynamic).reduce((partialSum, a) => partialSum + a, 0)}</span>
                                </li>
                                ))}
                            </ul>
                        </div>
                    }
                </div>
                { authUser.username === user.username &&
                    <Link to="/publications/new">Create New Publication</Link>
                }
            </div>
        )
    }
}

export default UserPage;