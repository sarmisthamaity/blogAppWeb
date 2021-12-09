import './App.css';
import Homepage from './components/Homepage/Homepage';
import Register from './components/Signup/Signup';
import Login from './components/Login/Login';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UploadSingleImage from './components/Blog/Blog';
import UploadProfile from './components/profile/Profile';


function App() {
  return (
    <div className="App"> 
      <Router>
        <Switch>
          <Route exact path= '/'> <Homepage/> </Route>
          <Route path= '/login'> <Login/> </Route>
          <Route path= '/signup'> <Register/> </Route>
          <Route path= '/blogs'> <UploadSingleImage/></Route>
          <Route path= '/profileimg'> <UploadProfile/></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;