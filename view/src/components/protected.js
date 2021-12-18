import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useCookies } from "react-cookie";


const ProtectedRoute = ({ component: Component, ...rest }) => {
    const [cookies, setCookie] = useCookies(["Token"]);
    // console.log(cookies.getItem("Token"), 'lllll');
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    // const isAuthenticated = cookies.getItem("isAuthenticated")
    // console.log(cookies["isAuthenticated"], 'oooo');
    console.log(isAuthenticated);
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    )
}


export default ProtectedRoute