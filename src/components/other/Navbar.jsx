import { useAuth } from "../context/AuthContext"

const Navbar = () => {

    const Auth = useAuth()
    const user = Auth.getUser()
    const isUser = user.role === 'USER'

    return (
        <div>
        {user.username}<br />
        <a href='/'>Starting page</a><br />
        <a href='/publications'>Publications</a><br />
        <a href='/login'>Login</a><br />
        <a href='/signup'>Sign up</a><br />
        </div>
    )
}

export default Navbar;