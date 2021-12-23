import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';



const ProtectedRoute = ({ component: Component, ...rest }) => {

    const isAuthenticated = localStorage.getItem("isAuthenticated");

    // console.log(isAuthenticated, 'xxxxxxxxxx');

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