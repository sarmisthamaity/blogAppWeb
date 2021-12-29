import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './components/Homepage/Homepage';
// import Register from './components/Signup/Signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UploadProfile from './components/profile/Profile';
import ProtectedRoute from './components/protected';
import Comment from './components/comment/comments';
import AllUser from './components/allpost/AllUser';
import GetUserProfile from './components/allpost/User';
import AllPostBlogs from './components/allpost/AllBlogPosts.js';
import GetOneUser from './components/Blog/Bloguser';
import Navbar from './components/Navbar';
// import SignIn from './components/Login/Login'
// import EditProfileUi from './components/profile/Editprofile';
import EditBlog from './components/Blog/Editblog';


// With Template UI 
import LogIn from './components/Login/TemplateLogin';
import SignUp from './components/Signup/Sign';
import BlogCreate from './components/Blog/CreateBlog';


function App() {                                                  
  

  return (
          <Router>
            <Navbar />
            <Switch>

              {/* <Route exact path='/log'> <SignIn/></Route> */}

              {/* Login Route */}
              {/* <Route path='/SignIn'> <SignIn /> </Route> */}

              {/* With Template UI  */}

              <Route path='/sign'><SignUp/></Route>
              <Route path='/login'><LogIn/></Route>
              <ProtectedRoute exact path='/blog' component={BlogCreate} />
              <Route exact path='/' component={AllPostBlogs}/>
              <Route path='/profileimg'> <UploadProfile /></Route>



              {/* Signup Route */}
              {/* <Route path='/signup'> <Register /> </Route> */}
              {/* <Route exact path='/signup' component={Register} /> */}


              {/* <ProtectedRoute exact path='/blogs' component={BlogCreate} /> */}


              {/* USER BLOG Route */}
              {/* <ProtectedRoute exact path='/blog' component={BlogCreate} /> */}
              <ProtectedRoute exact path='/editContent' component={EditBlog} />
              <Route path='/userBlog'><GetOneUser/></Route>


              {/* <ProtectedRoute exact path='/allPosts' component={AllPostBlogs} /> */}


              {/* <Route path='/blog'> <UploadSingleImage /></Route> */}

              {/* <Route path='/editContent' ><EditBlog/></Route> */}



              {/* USER Profile ROUTE */}

              {/* <Route path='/oneuser'><AllUser/> </Route>
              {/* <Route path='/editprofile'><EditProfileUi/> </Route> */}



              <Route path='/userprofile'><GetUserProfile/> </Route>
              {/* <Route path='/comments'> <Comment /></Route> */}


              {/* <Route path='/allposts'> <BlogPosts /></Route> */}


            </Switch>
         </Router>
  );
}



export default App;