import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory} from 'react-router-dom'


const Home = () => {
    const [postList, setPostList] = useState([])
    let history=useHistory()
   
  
    //let id=useParams()
    useEffect(() => {
        if(!localStorage.getItem("accessToken")){
            history.push("/login")
        }else{
            axios.get("http://localhost:3001/posts")
            .then((response) => {
                setPostList(response.data)
            })
        }
        
    }, [])

    const deletePost=(postId)=>{
        axios.delete(`http://localhost:3001/posts/${postId}`)
        .then(()=>{
            history.push("/")
        })
    }

    const likeAPost=(postId)=>{
        axios.post("http://localhost:3001/likes",{PostId:postId},{
            headers:{
                accessToken:localStorage.getItem("accessToken")
            }
        })
        .then((response)=>{
            setPostList(
                postList.map((post)=>{
                    if(post.id===postId){
                        if(response.data.liked){
                            return {post,Likes:[...post.Likes,0]}
                        }else{
                            const likesArray=post.Likes
                            likesArray.pop()
                            return{...post,Likes:likesArray}
                        }
                    }else{
                        return post
                    }
                })
            )
        })
    }


    

    return (

        <div>
            {
                postList.map((value, key) => {
                    return (
                        <div key={key}  className="mb-8 border-2 border-opacity-25 border-indigo-400 rounded-md px-4  py-2 flex flex-col">
                            <div className="flex flex-row justify-between mb-4">
                                <h3 className="font-bold capitalize">{value.title}</h3>
                                <h6 className="font-semibold capitalize">{value.UserId}</h6>
                            </div>
                            <div>
                                <p className="capitalize">{value.postText}</p>
                            </div>
                            <div className="flex fle-row justify-between">
                                <div onClick={()=>{likeAPost(value.id)}}>
                                    <i className="fas fa-heart text-red-400 text-xl focus:text-2xl"></i> 2
                                </div>

                                <div onClick={()=>{history.push(`/profile/${value.id}`)}} className=""  >
                                    <i className="fas fa-user text-red-400 text-xl hover:text-2xl"></i>
                                </div>

                                <div onClick={()=>{history.push(`/post/${value.id}`)}} className=""  >
                                    <i className="fas fa-comments text-red-400 text-xl hover:text-2xl"></i>
                                </div>


                                <div onClick={()=>{history.push(`/edit/${value.id}`)}} className=""  >
                                    <i className="fas fa-edit text-red-400 text-xl hover:text-2xl"></i>
                                </div>

                                <div onClick={()=>{deletePost(value.id)}} className=""  >
                                    <i className="fas fa-trash-alt text-red-400 text-xl hover:text-2xl"></i>
                                </div>
                            </div>

                        </div>
                    )
                })
            }

        </div>
    )
}

export default Home
