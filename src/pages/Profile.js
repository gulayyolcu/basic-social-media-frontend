import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

const Profile = () => {
    let { id } = useParams()
    let history = useHistory()
    const [username, setUsername] = useState("")
    const [postList, setPostList] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicinfo/${id}`)
            .then((response) => {
                setUsername(response.data)
            })
        axios.get(`http://localhost:3001/posts/byuserId/${id}`)
            .then((response) => {
                setPostList(response.data)
            })
    }, [])

    return (
        <div>
            {
                Array.isArray(postList) && postList.map((userpost,key)=>{
                    return(
                        <div key={key} className="mb-8 border-2 border-opacity-25 border-indigo-400 rounded-md px-4  py-2 flex flex-col">
                        <div>
                            <h3 className="font-bold capitalize">{userpost.title}</h3>
                            <h6 onClick={()=>{history.push("/changepassword")}} className="font-semibold capitalize underline">User Id: {userpost.UserId}</h6>
                        </div>
                        <div>
                            <p className="capitalize">{userpost.postText}</p>
                        </div>
                    </div>
                    )
                })
            }

           

        </div>

    )
}

export default Profile
