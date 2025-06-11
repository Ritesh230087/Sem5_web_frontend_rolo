import React, { useState } from 'react'
import { useRegisterUser as useRegisterUserTan } from '../../hooks/useRegisterUserTan'

export default function RegisterForm() {
    const { mutate, data, error, isPending } = useRegisterUserTan()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        mutate(formData)
    }

    return (
        <div>
            RegisterForm
            <form onSubmit={handleSubmit}>
                <label>First Name</label>
                <input name="firstName" value={formData.firstName} onChange={handleChange} />

                <label>Last Name</label>
                <input name="lastName" value={formData.lastName} onChange={handleChange} />

                <label>Email</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} />

                <label>Password</label>
                <input name="password" type="password" value={formData.password} onChange={handleChange} />

                <button type="submit">Register</button>

                {error && <p>{error.message}</p>}
                {data && <p>{data.message}</p>}
            </form>
        </div>
    )
}
