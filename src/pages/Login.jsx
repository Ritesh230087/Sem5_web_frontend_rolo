import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import { AuthContext } from '../auth/AuthProvider'

export default function Login() {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const returnToHome = (event) => {
        event.preventDefault()
        navigate("/")
    }

    if (user) {
        return <div>You are already logged in.</div>
    }

    return (
        <div>
            <div>Login</div>
            <NavLink to="/">Go back</NavLink>
            <Link to="/register">Sign Up</Link>
            <div>
                <LoginForm />
            </div>
        </div>
    )
}
