import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { FaWater } from 'react-icons/fa';



const LogIn = () => {

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
                history.push('/sign')
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
        <section className="vh-100" style={{
            backgroundColor: "#eee",
            backgroundImage:
                "url(https://images.pexels.com/photos/6270377/pexels-photo-6270377.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)"
        }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-8 col-xl-8">
                        <div className="card text-black" style={{ borderRadius: 25, backgroundColor: 'lightgrey' }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                            Sign In
                                        </p>
                                        <form className="mx-1 mx-md-4">

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="form3Example3c">
                                                        Enter Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="form3Example3c"
                                                        className="form-control"
                                                        name='email'
                                                        value={user.email}
                                                        onChange={handleChange}
                                                    />

                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw" />
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="form3Example4c">
                                                        Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        id="form3Example4c"
                                                        className="form-control"
                                                        name='password'
                                                        value={user.password}
                                                        onChange={handleChange}
                                                    />

                                                </div>
                                            </div>




                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">

                                                <button type="button" className="btn btn-primary btn-lg" onClick={logIn}>
                                                    Login
                                                </button>
                                                <br />
                                                {errorMessage && <div className="error"> {errorMessage} </div>}

                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img
                                            src="https://img.freepik.com/free-photo/aerial-view-woman-using-computer-laptop-wooden-table_53876-20661.jpg?size=626&ext=jpg"
                                            className="img-fluid"
                                            height='200%'
                                            width='100%'
                                            alt="Sample image"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}


export default LogIn;