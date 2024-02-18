import React, { useState } from 'react'
import { useEffect } from 'react'
import { UseFirebase } from '../context/ContextBase'
import "./../styles/Home.css"
import {RiDeleteBin6Fill} from 'react-icons/ri'

function Home() {
  const firebase=UseFirebase();
  const [allData,setallData]=useState([]);

  const deletF=()=>{
    console.log("delete event called");
  }

  useEffect(()=>{
    firebase.allPosts(setallData);
    
  },[])
  
  return (
    <div className='Home' >
        <h3 className='display-5 text-center'>Hey Alien!!</h3>
    {
      allData &&
      allData.map((postObj,id)  =>(
        <div key={id} className='home-card' >
        <div className='card-header' >
        <p  >  <span className='headings' >Title: </span>  {postObj.data().title}</p>
        <p  >  <span className='headings' >Author: </span>  {postObj.data().author?.name}</p>
        </div>
        <p className='display-2 body-header'>Content:</p>
        <p className='card-content'>{postObj.data().postData}</p>
        </div>
      )
      )
    }
    </div>
  )
}

export default Home