import React,{useState} from 'react';
import axios from 'axios'

import {useParams,useHistory} from 'react-router-dom'



const EditPost = () => {

 
    let {id}=useParams()
    let history=useHistory()

    const [title,setTitle]=useState("")
    const [postText,setPostText]=useState("")
    const [PostId,setPostId]=useState("")



    const editPost=()=>{
   

        var post1={title,postText}
    
        console.log(post1);
        axios.put(`http://localhost:3001/posts/edit/${id}`,post1,{
            headers:{
                accessToken:localStorage.getItem("accessToken")
            }
        })
        .then(()=>{
            history.push(`/`)
        })
    }

    return (
        <div>
            <div className="flex flex-col mt-16">
                    <div>
                        <label className="font-bold">Title: </label>
                        <input onChange={(e)=>setTitle(e.target.value)}  value={title} type="text" name="title" placeholder="Enter title.." className="mb-8" />
                   
                    </div>
                    <div>
                        <label className="font-bold">Text: </label>
                        <textarea onChange={(e)=>setPostText(e.target.value)}  value={postText}  rows="5" name="postText"  placeholder="Enter text.." className="w-full mb-8"/>
                    
                    </div>

                    <div>
                        <label className="font-bold">Post Id: </label>
                        <input onChange={(e)=>setPostId(e.target.value)} value={PostId}   type="text" name="PostId" placeholder="Enter title.." className="mb-8" />
                   
                    </div>
               
                    <button onClick={editPost} type="button" className="font-bold capitalize bg-indigo-200 mt-8 px-4 py-2 rounded-md">Edit Post</button>
                </div>
        </div>
    )
}

export default EditPost
