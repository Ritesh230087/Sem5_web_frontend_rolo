import React, { useContext } from 'react'
import RegisterForm from '../components/auth/RegisterForm'
import { AuthContext } from '../auth/AuthProvider'

export default function Register() {
    const { user } = useContext(AuthContext)

    if (user) {
        return <div>You are already registered and logged in.</div>
    }

    return (
        <div>
            Register
            <RegisterForm />
        </div>
    )
}
