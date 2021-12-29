import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import './signup.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';



const SignUp = () => {

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
            history.push('/login')
        } catch (err) {
            console.log("inside catch");
            setErrorMessage(err.response.data.message)
            // console.log(err.response.data.message);
        }

    }


    return (

        <section className="vh-100" style={{
            backgroundColor: "#eee",
            backgroundImage:
                "url(https://image.freepik.com/free-vector/abstract-dynamic-wave-wavy-green-lines-with-geometric-elements-white-background-vector-illustration_78474-990.jpg)"
        }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-10 col-xl-9">
                        <div className="card text-black" style={{ borderRadius: 25 }}>
                            <div className="card-body p-md-5" style={ {color: 'black', borderRadius: 25 , backgroundColor: 'lightseagreen'}}>
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                            Sign up
                                        </p>
                                        <form className="mx-1 mx-md-4">
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw" />
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="form3Example1c">
                                                        Enter Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="form3Example1c"
                                                        className="form-control"
                                                        name='name'
                                                        value={user.name}
                                                        onChange={handleChange}
                                                    />

                                                </div>
                                            </div>

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

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw" />
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="form3Example4cd">
                                                        Gender
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="form3Example4cd"
                                                        className="form-control"
                                                        name='gender'
                                                        value={user.gender}
                                                        onChange={handleChange}
                                                    />

                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw" />
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="form3Example4cd">
                                                        Location
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="form3Example4cd"
                                                        className="form-control"
                                                        name='location'
                                                        value={user.location}
                                                        onChange={handleChange}
                                                    />

                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">

                                                <button type="button" className="btn btn-primary btn-lg" onClick={register}>
                                                    Register
                                                </button>
                                                <br/>
                                                {errorMessage && <div className="error"> {errorMessage} </div>}

                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img
                                            src="https://cdn.pixabay.com/photo/2020/04/03/06/35/work-4997565__480.png"
                                            height= '150%'
                                            width= '120%'
                                            className="img-fluid"
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



export default SignUp;