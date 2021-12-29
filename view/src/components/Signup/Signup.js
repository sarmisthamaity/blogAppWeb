import React, { useState } from 'react';
import './signup.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const Register = () => {
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState();
    const [success, setSuccess] = useState();

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

    const register = async () => {
        try {
            const res = await axios.post('http://127.0.0.1:8080/signup', user)
            setSuccess(res.data.message)
            history.push('/SignIn')
        } catch (err) {
            console.log("inside catch");
            setErrorMessage(err.response.data.message)
            console.log(err.response.data.message);
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
        <div className='centered'>
            <div className="register">
                <h2> Register </h2>

                <input type="name" name="name" value={user.name} placeholder=" Enter Name" onChange={handleChange} ></input>
                <input type="email" name="email" value={user.email} placeholder=" Enter Email" onChange={handleChange} ></input>
                <input type="password" name="password" value={user.password} placeholder=" Enter Password" onChange={handleChange} ></input>
                <input type="text" name="gender" value={user.gender} placeholder=" Enter Gender (optional)" onChange={handleChange} ></input>
                <input type="text" name="location" value={user.location} placeholder=" Enter location(optional)" onChange={handleChange} ></input>

                <div className='sign'>

                    <button onClick={register}>Register </button>

                    {errorMessage && <div className="error"> {errorMessage} </div>}

                </div>
                <div> or </div>

                <div className='sign'>
                    <button onClick={() => history.push('/login')}>Login</button>

                </div>


            </div>
        </div>
    )


}


export default Register