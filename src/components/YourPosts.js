import React from 'react'
import { useNavigate } from 'react-router'
import { useEffect,useState } from 'react';
import { auth } from '../context/ContextBase';
import { UseFirebase } from '../context/ContextBase';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import "./../styles/Home.css"
import {RiDeleteBin6Fill} from 'react-icons/ri'

function YourPosts({isAuth}) {

const navigate=useNavigate();
const firebase=UseFirebase();
const [userData,setUserData]=useState([])

const deletePost=(title,setUserData)=>{
  console.log("Dlt my post "+title)
  firebase.dltPost(title,setUserData);
}

useEffect(()=>{
    if(!isAuth){
      navigate("/login");
    }
    else{
        firebase.UserPosts(setUserData);
    }
},[userData])
   
  return (
    <div>
        {isAuth && 
        <>
        <h3 className='display-5 text-center'>Hey {auth.currentUser.displayName}!!</h3>
        <h3 className='display-5 text-center'>Your Space</h3>
        </>
        }
        {
      userData &&
      userData.map((postObj,id)  =>(
        <div key={id} className='home-card' >
        <div className='card-header' >
        <p  >  <span className='headings' >Title: </span>  {postObj.data().title}</p>
        <p  >  <span className='headings' >Author: </span>  {postObj.data().author?.name}</p>
        <RiDeleteBin6Fill className='DltBtn' onClick={()=>deletePost(postObj.data().title,setUserData)}/>
        </div>
        <p className='display-2 body-header'>Content:</p>
        <p className='card-content'>{postObj.data().postData}</p>
        </div>
      ))
    }
    </div>
  )
}

export default YourPosts