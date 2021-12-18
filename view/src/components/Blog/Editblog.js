import React, { useState } from 'react';
import { useCookies } from "react-cookie";
import axios from 'axios';

const EditBlog = () => {
    const [bio, setBio] = useState();
    const [picture, setPicture] = useState('');

    const [cookies, setCookie] = useCookies(["Token"]);

    const Send = event => {
        const formData = new FormData();
        formData.append("bio", bio);
        formData.append("file", picture)
        
        // console.log(formData, cookies);
        const config = {
            headers: {
                authorization: cookies.Token
            }
        }

        axios.put('http://127.0.0.1:8080/editContent', formData, config)
            .then(response => {
                alert(response.data.message)
                console.log(response.data, 'vvvv');
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="blog">
            <h1> Blog Post </h1>
            <input type="text" id="blog" placeholder="About Your Post" onChange={event => {
                const { value } = event.target
                setBio(value)
            }} />
            <br/>
            <input type="file" onChange={event => {
                const picture = event.target.files[0]
                setPicture(picture)
            }}></input> 
            <br/>
            <button onClick={Send}>edit</button>       
        </div>
    )
}



export default EditBlog;