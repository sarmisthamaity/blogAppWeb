import React, {useState} from 'react';
import './login.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { useCookies } from "react-cookie";


const Login = () => {
    const history = useHistory();
    const [cookies, setCookie] = useCookies(["Token", "isAuthenticated"]);

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
            axios.post('http://127.0.0.1:8080/login', user, )
            .then((resp) => {
                alert(resp.data.message)
                // console.log(resp.data.Token, 'ooooo')
                setCookie("Token", resp.data.Token)
                setCookie("isAuthenticated", true)
            // localStorage.setItem("isAuthenticated", "true");
            // localStorage.setItem("Token", resp.data.Token);

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
            <h2> Login </h2>
            {/* {console.log("user", user)} */}
            <input type="text" name= "name" value={user.name} onChange= {handleChange} placeholder=" Enter Name"  ></input>
            <input type="text" name= "email" value={user.email} onChange= {handleChange} placeholder=" Enter Email"  ></input>
            <input type="password" name= "password" value={user.password} onChange= {handleChange} placeholder=" Enter Password"  ></input>
            <div className="button" onClick={function(event) { logIn (event)}}> Login </div>
            <div> or </div>
            <div className="button" onClick={() => history.push('/signup')}> Registration </div>
        </div>
    )
}


// resetInputField()

export default Login