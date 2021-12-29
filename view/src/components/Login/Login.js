import React, { useState } from 'react';
import './login.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { error } from 'winston';


const SignIn = () => {
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState('');

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const logIn = async () => {

        try {
            const result = await axios.post('http://127.0.0.1:8080/login', user);
            localStorage.setItem('Token', result.data.Token)
            localStorage.setItem('isAuthenticated', true)
            history.push('/')
            if(result.data.message == 'username or email something is wrong'){
                history.push('/signup')
            }

        } catch (error) {
            // console.log(err.response.data.message);
            setErrorMessage(error.response.data.message)
        }
    }


    const resetInputField = () => {
        setUser({
            email: "",
            password: ""
        });
    };



    return (
        <div className='centered'>
            <div className="login">
                <h2> Login </h2>
                {/* {console.log("user", user)} */}
                <input type="text" name="email" value={user.email} onChange={handleChange} placeholder=" Enter Email"></input>
                <input type="password" name="password" value={user.password} onChange={handleChange} placeholder=" Enter Password"  ></input>

                <div className='log'>

                    <button onClick={() => logIn()}>login </button>
                    {errorMessage && <div className="error"> {errorMessage} </div>}

                </div>

                <div> or</div>

                <div className='log'>
                    <button onClick={() => history.push('/signup')}>Register</button>
                </div>

            </div>
        </div>
    )
}


// resetInputField()

export default SignIn