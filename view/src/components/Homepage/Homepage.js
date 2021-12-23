import React from 'react';
import './homepage.css'
import { useHistory } from 'react-router-dom';


const Homepage = () => {
    const history = useHistory();
    const Logout = (e) => {
        localStorage.removeItem("Token")
        history.push('/signUp')
    }

    // const handleData = () => {
    //     history.push('/blogComments')
    // }


    return (
        <div className='centered'>
            <div className="homepage">
                <h1> Homepage </h1>
                <button onClick={() => Logout}>logout</button><br/>

                {/* <button onClick={ handleData}>Show posts</button> */}
                
            </div>
        </div>
    )
}

export default Homepage;