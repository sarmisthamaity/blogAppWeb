import React, { useState } from 'react';
import { useCookies } from "react-cookie";
import axios from 'axios';

const EditBlog = () => {
    const [bio, setBio] = useState();
    const [picture, setPicture] = useState('');

    const Token = localStorage.getItem('Token')
    const search = window.location.search;

    const Id = new URLSearchParams(search).get('ID');
    // console.log(Id, 'mmmmmm');

    const Send = event => {
        const formData = new FormData();
        formData.append("bio", bio);
        formData.append("file", picture)

        // console.log(formData);

        const config = {
            headers: {
                authorization: Token
            }
        }

        axios.put(`/?ID=${Id}'`, formData, config)
            .then(response => {
                alert(response.data.message)
                // console.log(response.data, 'vvvv');
            }).catch(err => {
                console.log(err);
            })
    }

    
    return (
        <div className='centered'>
            <div className="blog">
                <h1>Edit Blog Post </h1>
                <input type="text" id="blog" placeholder="Edit Your Post" onChange={event => {
                    const { value } = event.target
                    setBio(value)
                }} />
                <br />
                <input type="file" onChange={event => {
                    const picture = event.target.files[0]
                    setPicture(picture)
                }}></input>
                <br />
                <button onClick={Send}>edit</button>
            </div>
        </div>
    )
}


export default EditBlog;