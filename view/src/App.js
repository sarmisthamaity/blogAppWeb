import './App.css';
import Homepage from './components/Homepage/Homepage';
import Register from './components/Signup/Signup';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UploadSingleImage from './components/Blog/CreateBlog';
import UploadProfile from './components/profile/Profile';
import React from 'react';
import ProtectedRoute from './components/protected';
import Comment from './components/comment/comments';
import AllUser from './components/allpost/AllUser';
import GetUserProfile from './components/allpost/User';
import AllPostBlogs from './components/allpost/AllBlogPosts.js';
import GetOneUser from './components/Blog/Bloguser';
import Navbar from './components/Navbar';



// import Images from '../../images'
// import EditProfileUi from './components/profile/Editprofile';

import EditBlog from './components/Blog/Editblog';


function App() {
  

  return (
        // <div className="">
          <Router>
            <Navbar />
            <Switch>
              {/* <Route exact path='/'> 
              {
                cookies.isAuthenticated ? <Homepage /> : <Login/>
              }
              </Route> */}

              <Route exact path='/' component={Homepage}/>


              {/* Login Route */}
              <Route exact path='/login' component={Login} />
              {/* <Route path='/login'> <Login /> </Route> */}


              {/* Signup Route */}
              {/* <Route path='/signup'> <Register /> </Route> */}
              <Route exact path='/signup' component={Register} />


              {/* <ProtectedRoute exact path='/blogs' component={UploadSingleImage} /> */}


              {/* USER BLOG Route */}
              <ProtectedRoute exact path='/blog' component={UploadSingleImage} />
              <ProtectedRoute exact path='/editContent' component={EditBlog} />
              <Route path='/userBlog'><GetOneUser/></Route>


              {/* <ProtectedRoute exact path='/blogComments' component={AllPostBlogs} /> */}


              {/* ALL POSTS  */}

              <Route path='/blogComments'><AllPostBlogs/></Route>



              {/* <Route path='/blog'> <UploadSingleImage /></Route> */}
              {/* <Route path='/editContent' ><EditBlog/></Route> */}



              {/* USER Profile ROUTE */}

              {/* <Route path='/oneuser'><AllUser/> </Route>
              {/* <Route path='/editprofile'><EditProfileUi/> </Route> */}



              {/* <Route path='/userprofile'><GetUserProfile/> </Route>
              <Route path='/profileimg'> <UploadProfile /></Route>
              <Route path='/comments'> <Comment /></Route> */}


              {/* <Route path='/allposts'> <BlogPosts /></Route> */}


            </Switch>
         </Router>
  );
}



export default App;