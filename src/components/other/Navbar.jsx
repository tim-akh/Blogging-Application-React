import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"

const Navbar = () => {

    const Auth = useAuth()
    const isAuthenticated = Auth.userIsAuthenticated()

    const user = Auth.getUser()
    var currentUserPage = "/users/"

    if (isAuthenticated) {
        const isUser = user.role === 'USER'
        currentUserPage = "/users/" + user.username
    }
    
    return (
        <div>
            { isAuthenticated
            ?
            <Link to={currentUserPage}>{user.username}</Link>
            :
            <Link to="/login">Login</Link>
            }<br />
            <Link to="/">Starting page</Link><br />
            <Link to="/publications">Publications</Link><br /><br /><br /><br />
        </div>
    )
}

export default Navbar;