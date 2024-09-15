import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Layout from './pages/Layout';
import AddBlog from './pages/addblog/AddBlog';
import Home from './pages/Home/Home';
import Signup from './pages/auth/signup/Signup';
import SignIn from './pages/auth/signin/SignIn';
import Blogpage from './pages/blogpage/Blogpage';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path="/" element={<Home />}/>
      <Route path="/addblog" element={<AddBlog />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/signin" element={<SignIn />}/>
      <Route path="/pages/blogpage" element={<Blogpage />}/>
      
      

      
      
     
      
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router= {router} />
  </React.StrictMode>
)
