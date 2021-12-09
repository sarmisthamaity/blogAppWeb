import React, { useState } from 'react';
import axios from 'axios';

import { useCookies } from "react-cookie";


const UploadProfile = () => {
    const [bio, setBio] = useState();
    const [picture, setPicture] = useState();

    const [cookies, setCookie] = useCookies(["Token"]);

    const Upload = event => {
        const formData = new FormData();
        formData.append("bio", bio);
        formData.append("file", picture)
        // console.log(formData, cookies);
        const config = {
            headers: {
                authorization: cookies.Token
            }
        }

        axios.post('http://127.0.0.1:8080/profileimg', formData, config)
            .then(response => {
                alert(response.data.message)
                console.log(response.data.message, 'vvvv');
            }).catch(err => {
                console.log(err);
            })
    }
    return (
        <div className="profilePicture">
            <h1> profile Picture </h1>
            <input type="text" id="bio" placeholder="write your bio" onChange={event => {
                const { value } = event.target
                setBio(value)
            }} />
            <br/>
            <br/>
            <input type="file" onChange={event => {
                const picture = event.target.files[0]
                setPicture(picture)
            }}></input> 
            <br/>
            <br/>
            <button onClick={Upload}>Send</button>       
        </div>
    )
}


export default UploadProfile