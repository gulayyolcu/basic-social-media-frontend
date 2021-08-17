import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router, Link,Switch,Route} from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Register from './pages/Register'
import Login from './pages/Login'
import Post from './pages/Post'
import EditPost from './pages/EditPost'
import Profile from './pages/Profile'
import ChangePassword from './pages/ChangePassword'
import PageNotFound from './pages/PageNotFound'
import {AuthContext} from './helpers/AuthContext'
import axios from 'axios';

const App = () => {
  const [authState,setAuthState]=useState({
    username:"",
    id:0,
    status:false
  })

  useEffect(()=>{
      axios.get("http://localhost:3001/auth/auth",{
            headers:{
                accessToken:localStorage.getItem("accessToken")
            }
      })
      .then((response)=>{
        if(response.data.error){
            console.log(response.data.error);
        }else{
            setAuthState({
                username:response.data.username,
                id:response.data.id,
                status:true
            })
        }
          
      })
  },[authState])

  const logout=()=>{
    localStorage.removeItem("accessToken")
    setAuthState({
      username:"",
      id:0,
      status:false
    })
  }

  return (
    <div>
      <AuthContext.Provider value={{authState,setAuthState}}>
        <Router>
         <div className="flex flex-row justify-between mb-10 mt-12 sm:flex-wrap">
           {authState.status===true?(<>
            <div>          
              <Link to="/">Home</Link>
            </div>
            <div>
              <Link to="/createpost">Create Post</Link>
            </div>
            </>):
            (<>
            <div>
            <Link to="/register">Register</Link>
            </div>
            <div>
              <Link to="/login">Login</Link>
            </div>
            </>)}
            <div>
                {authState.status===true && (<button onClick={logout} className="text-xl font-bold font-bold capitalize bg-indigo-200  px-2 py-1 rounded-md sm:mt-4 md:-mt-4">Logout</button>)}
            </div>
        </div>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/posts" component={Home}/>
            <Route path="/createpost" exact component={CreatePost}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/edit/:id" exact component={EditPost}/>
            <Route path="/post/:id" exact component={Post}/>
            <Route path="/profile/:id" exact component={Profile}/>
            <Route path="/changepassword" exact component={ChangePassword}/>
            <Route path="*" exact component={PageNotFound}/>
        </Switch>
      </Router>
      </AuthContext.Provider>
    </div>
  )
}

export default App
