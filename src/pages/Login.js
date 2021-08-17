import React,{useContext} from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import * as Yup from 'yup'
import { AuthContext } from '../helpers/AuthContext'

const Login = () => {
    const {setAuthState}=useContext(AuthContext)
    let history=useHistory()

    const initialValues={
        username:"",
        password:""
    }

    const validationSchema=Yup.object().shape({
        username:Yup.string().min(3).max(15).required(),
        password:Yup.string().min(4).max(20).required()
    })

    const onSubmit=(data)=>{

        axios.post("http://localhost:3001/auth/login",data)
        .then((response)=>{
            if(response.data.error){
                console.log(response.data.error);
            }else{
                localStorage.setItem("accessToken",response.data.token)
                setAuthState({
                    username:response.data.username,
                    id:response.data.id,
                    status:true
                })
            }
            history.push("/")
        })
    }

    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form className="flex flex-col mt-16">
                    <div>
                        <label className="font-bold">Username: </label>
                        <Field autoComplete="off" name="username" placeholder="Enter username.." />
                        <ErrorMessage name="username" component="span"></ErrorMessage>
                    </div>
                    <div>
                        <label className="font-bold">password: </label>
                        <Field autoComplete="off" name="password" type="password" placeholder="Enter username.." />
                        <ErrorMessage name="password" component="span"></ErrorMessage>
                    </div>
                    <button className="font-bold capitalize bg-indigo-200 mt-8 px-4 py-2 rounded-md">Login</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Login
