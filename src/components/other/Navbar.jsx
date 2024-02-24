import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"

const Navbar = () => {

    const Auth = useAuth()
    const user = Auth.getUser()
    const isUser = user.role === 'USER'
    const currentUserPage = "/users/" + user.username

    return (
        <div>
            <Link to={currentUserPage}>{user.username}</Link><br />
            <Link to="/">Starting page</Link><br />
            <Link to="/publications">Publications</Link><br />
            <Link to="/login">Login</Link><br />
            <Link to="/signup">Sign up</Link><br /><br /><br /><br />
        </div>
    )
}

export default Navbar;