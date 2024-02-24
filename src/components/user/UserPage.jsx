import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const UserPage = () => {

    const Auth = useAuth()
    const authUser = Auth.getUser()
    const isRoleUser = authUser.role === 'USER'

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


    return (
        <div>
            <h1>Profile</h1>
            <div>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                {
                    user.publications.length === 0 ? "No publications yet" :
                    <div>
                        <p>Publications:</p>
                        <ul>
                            {user.publications.map(publication => (
                            <li key={publication.id}>
                                <Link to={`/publications/${publication.id}`}>{publication.header}</Link>
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

export default UserPage;