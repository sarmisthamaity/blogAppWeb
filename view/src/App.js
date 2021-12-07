import './App.css';
import Homepage from './components/Homepage/Homepage';
import Register from './components/Signup/Signup';
import Login from './components/Login/Login';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UploadSingleImage from './components/Blog/Blog';

function App() {
  return (
    <div className="App"> 
      <Router>
        <Switch>
          <Route exact path= '/'> <Homepage/> </Route>
          <Route path= '/login'> <Login/> </Route>
          <Route path= '/signup'> <Register/> </Route>
          <route path= '/blogs'> <UploadSingleImage/></route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;