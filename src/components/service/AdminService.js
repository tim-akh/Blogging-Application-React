import axios from 'axios';

class AdminService {
    banUser = async (user) => {
        await axios.put(`http://localhost:8080/api/v1/users/${user.id}`, {
            "email": user.email,
            "username": user.username,
            //"password": user.password,
            "role": user.role,
            "banned": true
        })
        window.location.reload();
    }

    unbanUser = async (user) => {
        await axios.put(`http://localhost:8080/api/v1/users/${user.id}`, {
            "email": user.email,
            "username": user.username,
            //"password": user.password,
            "role": user.role,
            "banned": false
        })
        window.location.reload();
    }

    makeUserAdmin = async (user) => {
        await axios.put(`http://localhost:8080/api/v1/users/${user.id}`, {
            "email": user.email,
            "username": user.username,
            //"password": user.password,
            "role": "ADMIN",
            "banned": user.banned
        })
        window.location.reload();
    }

    makeUserDefault = async (user) => {
        await axios.put(`http://localhost:8080/api/v1/users/${user.id}`, {
            "email": user.email,
            "username": user.username,
            //"password": user.password,
            "role": "USER",
            "banned": user.banned
        })
        window.location.reload();
    }
}

export default new AdminService()
