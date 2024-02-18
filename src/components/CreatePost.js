import React from 'react'
import { useState,useEffect } from 'react'
import { UseFirebase } from '../context/ContextBase';
import { useNavigate } from 'react-router';
import "./../styles/CreatePost.css"

function CreatePost({isAuth}) {
  const navigate=useNavigate();
  const firebase=UseFirebase();
  const [title,setTitle]=useState("");
  const [postData,setPostData]=useState("");

useEffect(()=>{
if(!isAuth){
  navigate("/login");
}
},[])

  const createpost=()=>{
// console.log("Title ",title);
// console.log("Data ",postData);
    firebase.putPostData(title,postData);
    navigate("/");
  }

  
  return (
    <div className='createPost' >
      <p className='display-4 text-center' >Post Your Content Online</p>
      <label>Title of Post :</label>
      <input type='text' placeholder='Title...' onChange={e=>setTitle(e.target.value)} />

      <label>Content of Post :</label>
      <textarea placeholder='Zapp...' onChange={e=>setPostData(e.target.value)} />
    <button className='d-flex m-auto' onClick={createpost} >Publish</button>
    </div>
  )
}

export default CreatePost