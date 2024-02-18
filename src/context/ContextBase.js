import { createContext,useContext } from "react"; 
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,signInWithPopup } from "firebase/auth"
import { getFirestore,addDoc,collection,getDocs, getDoc,query,where,deleteDoc } from "firebase/firestore"


import { useState } from "react";

// Context of the Fbase
const fbContext=createContext();


// FB Setup---------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyD5ADl9vJWsUcWzX6U28EkMnLEdJ7Y6sXw",
  authDomain: "blogbase-f2cda.firebaseapp.com",
  projectId: "blogbase-f2cda",
  storageBucket: "blogbase-f2cda.appspot.com",
  messagingSenderId: "813618222535",
  appId: "1:813618222535:web:50a53f30c3a6fc7c16b5e2"
};
const fbapp = initializeApp(firebaseConfig);
// -------------------------------------------------

// Hook of context for fbase
export const UseFirebase=()=>useContext(fbContext);

export const auth=getAuth(fbapp);
const db=getFirestore(fbapp);
export const provider=new GoogleAuthProvider();


export const FProvider=(props)=>{

// Stuff of fns and others


// const [isAuth,setIsAuth]=useState(false);

// 1.Create Post
const clctnRef=collection(db,'posts');
const putPostData=async (title,postData)=>{
    const res=await addDoc(clctnRef,{
        title,
        postData,
        author:{
            name:auth.currentUser.displayName,
            id:auth.currentUser.uid
        }
    })
}

// 2. Userposts
const UserPosts=async(setUserData)=>{
        const userid=auth.currentUser.uid;
        const q=query(clctnRef,where("author.id","==", userid ));
        const res=await getDocs(q);
        setUserData(res.docs);
        // console.log(res.docs.length)


        // res.docs.map(ele=>console.log(ele.data()))
        // console.log(res);
}

const allPosts=async (setallData)=>{
    const res=await getDocs(clctnRef);
    // console.log(res.docs.length)
    setallData(res.docs)
    // res.docs.map(ele=>{
    //     console.log(ele.data().author.name)
    //     console.log(ele.data().title)
    // })
}

const dltPost=async (title,setUserData)=>{
    const userid=auth.currentUser.uid;
    const q=query(clctnRef,where("title","==",title),where("author.id","==", userid ));
    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
          console.log("Document deleted successfully.");
        });
        UserPosts(setUserData);
      } 
  catch (error) {
        console.error("Error deleting document: ", error);
      }
}

    return (<fbContext.Provider value={{putPostData, UserPosts, allPosts,dltPost }} > 
        {props.children}
    </fbContext.Provider>);

}
