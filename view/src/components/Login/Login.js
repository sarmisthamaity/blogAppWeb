import React, {useState} from 'react';
import './login.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom';


const Login = () => {
    const history = useHistory();
    
    const [user, setUser ] = useState({
        name: "",
        email: "",
        password: ""
    })
    const handleChange = e => {
        const {name, value} = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    const logIn = (e) => {
        e.preventDefault()
        const {name, email, password} = user
        if(name && email && password ){
            axios.post('http://127.0.0.1:8080/login', user)
            .then((resp) => {
                alert(resp.data.message)
                console.log(resp)
            })
        } else{ 
            alert("invalid")
        }
    }
    const resetInputField = () => {
        setUser({
            name: "",
            email: "",
            password: ""
        });
    };

    return(
        <div className="login">
            <h1> Login </h1>
            {console.log("user", user)}
            <input type="text" name= "name" value={user.name} onChange= {handleChange} placeholder=" Enter Name"  ></input>
            <input type="text" name= "email" value={user.email} onChange= {handleChange} placeholder=" Enter Email"  ></input>
            <input type="password" name= "password" value={user.password} onChange= {handleChange} placeholder=" Enter Password"  ></input>
            <div className="button" onClick={function(event) { logIn (event);}}> Login </div>
            <div> or </div>
            <div className="button" onClick={() => history.push('/signup')}> Registration </div>
        </div>
    )
}


//resetInputField()
export default Login