import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import * as Yup from 'yup'

const CreatePost = () => {
    let history=useHistory()
    const initialValues={
        title:"",
        posText:"",
        UserId:""
    }

    const validationSchema=Yup.object().shape({
        title:Yup.string().required(),
        postText:Yup.string().required(),
        UserId:Yup.string().required()     

    })

    const onSubmit=(data)=>{
        axios.post("http://localhost:3001/posts",data,{
            headers:{
                accessToken:localStorage.getItem("accessToken")
            }
        })
        .then(()=>{
            history.push("/")
        })
    }
    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form className="flex flex-col mt-16">
                    <div>
                        <label className="font-bold">Title: </label>
                        <Field autoComplete="off" name="title" placeholder="Enter title.." className="mb-8" />
                        <ErrorMessage name="title" component="span" ></ErrorMessage>
                    </div>
                    <div>
                        <label className="font-bold">Text: </label>
                        <Field row="5" autoComplete="off" name="postText" placeholder="Enter text.." className="mb-8"/>
                        <ErrorMessage name="postText" component="span"></ErrorMessage>
                    </div>
                    <div>
                        <label className="font-bold">Username: </label>
                        <Field autoComplete="off" name="UserId" placeholder="Enter username.." />
                        <ErrorMessage name="username" component="span"></ErrorMessage>
                    </div>
                    <button className="font-bold capitalize bg-indigo-200 mt-8 px-4 py-2 rounded-md">Save Post</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost
