import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'

const ChangePassword = () => {

    let history = useHistory()

    const initialValues = {
        oldPassword: "",
        newPassword: ""
    }

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().min(3).max(15).required(),
        newPassword: Yup.string().min(3).max(15).required()
    })

    const onSubmit = (data) => {
        axios.put("http://localhost:3001/auth/changepassword", data, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        })
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                }
                history.push("/login")
            })
    }

    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form className="flex flex-col mt-16">
                    <div>
                        <label className="font-bold">Old Password: </label>
                        <Field autoComplete="off" name="oldPassword" placeholder="Enter new.." />
                        <ErrorMessage name="oldPassword" component="span"></ErrorMessage>
                    </div>
                    <div>
                        <label className="font-bold">New Password: </label>
                        <Field autoComplete="off" name="newPassword" placeholder="Enter new.." />
                        <ErrorMessage name="newPassword" component="span"></ErrorMessage>
                    </div>
                    <button className="font-bold capitalize bg-indigo-200 mt-8 px-4 py-2 rounded-md">Login</button>
                </Form>
            </Formik>
        </div>
    )
}

export default ChangePassword;
