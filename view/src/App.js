import './App.css';
import Homepage from './components/Homepage/Homepage';
import Register from './components/Signup/Signup';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UploadSingleImage from './components/Blog/Blog';
import UploadProfile from './components/profile/Profile';
import React from 'react';
import ProtectedRoute from './components/protected';
import Comment from './components/comment/comments';
import AllUser from './components/allpost/AllUser';
import GetUserProfile from './components/allpost/Blogs';
import AllPostBlogs from './components/allpost/AllBlogPosts.js';


// import Images from '../../images'
// import EditProfileUi from './components/profile/Editprofile';
// import EditBlog from './components/Blog/Editblog';



function App() {
  
  return (
        <div className="App">
          <Router>
            <Switch>
              <Route exact path='/'> <Homepage /> </Route>

              <Route path='/login'> <Login /> </Route>
              <Route path='/signup'> <Register /> </Route>
              {/* <ProtectedRoute exact path='/blogs' component={UploadSingleImage} /> */}

              <Route path='/blog'> <UploadSingleImage /></Route>
              
              <Route path='/oneuser'><AllUser/> </Route>

              {/* <Route path='/editContent' ><EditBlog/></Route> */}
              {/* <Route path='/editprofile'><EditProfileUi/> </Route> */}

              <Route path='/userprofile'><GetUserProfile/> </Route>
              <Route path='/blogComments'><AllPostBlogs/></Route>
              <Route path='/profileimg'> <UploadProfile /></Route>
              <Route path='/comments'> <Comment /></Route>
              {/* <Route path='/allposts'> <BlogPosts /></Route> */}

            </Switch>
         </Router>
       </div>
  );
}


export default App;