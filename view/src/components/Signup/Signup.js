import React, { useState } from 'react';
import './signup.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';



const Register = () => {
    const history = useHistory();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        gender: "",
        location: "",
    })

    const handleChange = e => {
        // console.log(e.target)
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    const register = (e) => {
        e.preventDefault()
        const { name, email, password } = user
        if (name && email && password) {
            // alert("posted")
            axios.post('http://127.0.0.1:8080/signup', user)
                .then((resp) => {
                    alert(resp.data.message)
                    console.log(resp)

                }).catch((err) => {
                    console.log(err.message);
                })

            // console.log(user, 'fff');
        } else {
            alert("invalid")
        }
    }
    const resetInputField = () => {
        setUser({
            name: "",
            email: "",
            password: "",
            gender: "",
            location: ""
        });
    };

    return (
        <div className="register">
            <h2> Register </h2>
            <input type="name" name="name" value={user.name} placeholder=" Enter Name" onChange={handleChange} ></input>
            <input type="email" name="email" value={user.email} placeholder=" Enter Email" onChange={handleChange} ></input>
            <input type="text" name="password" value={user.password} placeholder=" Enter Password" onChange={handleChange} ></input>
            <input type="text" name="gender" value={user.gender} placeholder=" Enter Gender" onChange={handleChange} ></input>
            <input type="text" name="location" value={user.location} placeholder=" Enter location" onChange={handleChange} ></input>

            <div className="button" onClick={function (event) { register(event); resetInputField() }} > Register </div>

            <div> or </div>
            <div className="button" onClick={() => history.push('/login')}> Login</div>

        </div>
    )


}


export default Register