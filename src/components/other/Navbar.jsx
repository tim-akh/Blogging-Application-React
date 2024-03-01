import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"

const Navbar = () => {

    const Auth = useAuth()
    const isAuthenticated = Auth.userIsAuthenticated()

    var isRoleUser = false;
    var isRoleAdmin = false;

    const user = Auth.getUser()
    var currentUserPage = "/users/"


    if (isAuthenticated) {
        isRoleUser = user.role === 'USER'
        isRoleAdmin = user.role === 'ADMIN'
        currentUserPage = "/users/" + user.username
    }
    
    return (
        <div>
            { isAuthenticated
            ?
            <div>
            <Link to={currentUserPage}>{user.username}</Link><br />
            <Link onClick={Auth.userLogout}>Logout</Link>
            </div>
            :
            <Link to="/login">Login</Link>
            }<br />
            <Link to="/">Starting page</Link><br />
            <Link to="/publications">Publications</Link><br />
            {isRoleAdmin && <Link to="/reports">Reports</Link>}<br /><br /><br /><br />
        </div>
    )
}

export default Navbar;