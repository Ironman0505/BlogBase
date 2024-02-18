import { Route, Routes,Link } from "react-router-dom"
import './components/Home'
import './components/Login'
import './components/CreatePost'
import Home from "./components/Home";
import Login from "./components/Login";
import CreatePost from "./components/CreatePost";
import { useState } from "react";
import { signOut } from 'firebase/auth'
import { auth } from "./context/ContextBase"; 
import { useNavigate } from "react-router-dom";
import YourPosts from "./components/YourPosts";

function App() {
  const navigate=useNavigate();
  const [isAuth,setIsAuth]=useState(false);
  const signuserOut=()=>{
    signOut(auth)
    .then(()=>{
      localStorage.clear();
      setIsAuth(false);
      console.log("User Logged Out");
      navigate("/login");
    })
    .catch(er=>{
      console.log(er);
    })
  }


  return (
    <div className="App" >
          <nav className="navbar navbar-expand-lg navbar-light" style={{"backgroundColor": "#e3f2fd"}}>
      <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav d-flex justify-content-end">
          <Link className="nav-item nav-link active" to="/">Home </Link>
          
          {!isAuth ? 
          <>
          <Link className="nav-item nav-link" to="/login">Login</Link>
          </>
          :
          <>
          <Link className="nav-item nav-link" to="/userposts">My Posts</Link>
           <Link className="nav-item nav-link" to="/createP">Create</Link>
           <button className="btn" onClick={signuserOut} > Logout! </button>
          </>
         
          }
          
        </div>
      </div>
    </nav>

      <Routes>
        <Route  path="/" element={ <Home/>  } />

        <Route  path="/login" element={ <Login setIsAuth={setIsAuth} />  } />

        <Route  path="/createP" element={ <CreatePost isAuth={isAuth} />  } />
        <Route  path="userposts" element={ <YourPosts isAuth={isAuth} /> } />

      </Routes>
    </div>
  );
}

export default App;
