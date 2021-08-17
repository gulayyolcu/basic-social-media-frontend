import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useParams,useHistory} from 'react-router-dom'
const Post = () => {

    const [comments,setComments]=useState([])
    const [post,setPost]=useState({})
    const [newComment,setNewComment]=useState("")
    const [username,setUsername]=useState("")

    const addComment=()=>{
        axios.post("http://localhost:3001/comments",{
            commentBody:newComment,
            PostId:id
        },{
            headers:{
                accessToken:localStorage.getItem("accessToken")
            }
        })
        .then((response)=>{
            if(response.data.error){
                console.log(response.data.error);
            }else{
                const commentToAdd={
                    commentBody:newComment,
                    username:response.data.username
                }
                setComments([...comments,commentToAdd])
                setNewComment("")
            }
        })
    }
    let {id}=useParams()
    let history=useHistory()
    useEffect(()=>{
        axios.get(`http://localhost:3001/posts/byId/${id}`)
            .then((response) => {
                setPost(response.data)
            })

        axios.get(`http://localhost:3001/comments/${id}`)
        .then((response)=>{
            setComments(response.data)
        })
    },[])

    const deleteComment=(commentId)=>{
        axios.delete(`http://localhost:3001/comments/${commentId}`,{
            headers:{
                accessToken:localStorage.getItem("accessToken")
            }
        })
        .then(()=>{
            comments.filter((val)=>{
                return val.id!==commentId
            })
            history.push("/")
        })
    }

    return (
        <div>
            <div className="mb-8 border-2 border-opacity-25 border-indigo-400 rounded-md px-4  py-2 flex flex-col">
                <div className="flex flex-row justify-between mb-4">
                    <h3 className="font-bold capitalize">{post.title}</h3>
                    <h6 className="font-semibold capitalize">{post.id}</h6>
                </div>
                <div>
                    <p className="capitalize">{post.postText}</p>
                </div>
            </div>
            <div className="mb-8 border-2 border-opacity-25 border-indigo-400 rounded-md px-4  py-2 flex flex-col">
                <textarea onChange={(e)=>{setNewComment(e.target.value)}} name="newComment" placeholder="Leave a comment.." row="5"/>
                <input onChange={(e)=>{setUsername(e.target.value)}} type="text" name="username" placeholder="Enter username.."/>
                <button onClick={addComment} className="font-bold capitalize bg-indigo-200 mt-8 px-4 py-2 rounded-md">Save Comment</button>
            </div>
            <div className="mb-8 border-2 border-opacity-25 border-indigo-400 rounded-md px-4  py-2 flex flex-col">
          
                {
                    comments.map((comment,key)=>{
                        return(
                            <div key={key} className="mb-2 border-2 border-opacity-25 border-indigo-400 rounded-md px-4  py-2 flex flex-col">
                                <p>Comment: {comment.commentBody}</p>
                                <p>Username: {comment.UserId} {username}</p>
                                <p className="mb-4">Id: {comment.id}</p>
                                <button onClick={()=>deleteComment(comment.id)} className="text-sm font-bold font-bold capitalize bg-indigo-200 mt-8 px-4 py-2 rounded-md -mt-4">Delete Comment</button>
                            </div>
                        )
                    })
                }
                            
      
            </div>
        </div>
    )
}

export default Post
