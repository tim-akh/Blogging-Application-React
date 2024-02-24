import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const UserPage = () => {

    const { username } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
          const result = await axios.get(`http://localhost:8080/api/v1/users/${username}`);
          setUser(result.data);
          console.log("RESULT")
          console.log(result)
        };
        fetchUser();
      }, [username]);

    if (!user) {
        return <div>Loading...</div>
    }


    return (
        <div>
            <h1>{username}</h1>
            <div>
                <p>{user.username}</p>
                <p>{user.email}</p>
                <p>{user.role}</p>
                {/* <ul>
                    {publications.map(publication => (
                    <li key={publication.id}>
                        <Link to={`/publications/${publication.id}`}>{publication.id} - {publication.header}</Link>
                    </li>
                    ))}
                </ul> */}
            </div>
            <div>

            </div>
        </div>
    )
}

export default UserPage;