import React from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { useLoginUser } from '../../hooks/useLoginUser'

export default function LoginForm() {
    const { mutate, data, error, isPending } = useLoginUser()

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Please fill email"),
        password: Yup.string().min(8, "Password needs 8 characters").required("Please fill password")
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: (values) => {
            mutate(values)
        }
    })

    return (
        <div>
            LoginForm
            <form onSubmit={formik.handleSubmit}>
                <label>Email</label>
                <input
                    type='email'
                    name='email'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                    <p>{formik.errors.email}</p>
                )}

                <label>Password</label>
                <input
                    type='password'
                    name='password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                    <p>{formik.errors.password}</p>
                )}

                <button type='submit'>Login</button>

                {error && <p>{error.message}</p>}
                {data && <p>{data.message}</p>}
            </form>
        </div>
    )
}
