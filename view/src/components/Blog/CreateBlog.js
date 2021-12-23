import React, { useState } from 'react';
import axios from 'axios';
import './blog.css'


const UploadSingleImage = () => {
    const [blog, setBlog] = useState();
    const [picture, setPicture] = useState();

    const Token = localStorage.getItem('Token');

    const formData = new FormData();

    const Send = event => {
        formData.append("blog", blog);
        formData.append("file", picture)

        // console.log(formData);

        const config = {
            headers: {
                authorization: Token
            }
        }

        axios.post('http://127.0.0.1:8080/blogs', formData, config)
            .then(response => {
                alert(response.data.message)
                // console.log(response.data.message, 'vvvv');
            }).catch(err => {
                console.log(err);
            })
    }


    return (
        <div className='centered'>
            <div className="blog">
                <h1> Blog Post </h1>
                <input type="text" id="blog" placeholder="Write About Your Post" onChange={event => {
                    const { value } = event.target
                    setBlog(value)
                }} />
                <br />
                <input type="file" onChange={event => {
                    const picture = event.target.files[0]
                    setPicture(picture)
                }}></input>
                <br />

                <button onClick={Send}>Send</button>

                {/* <div> or</div>
            <button onClick={editBlog}>edit</button> */}

            </div>
        </div>
    )
}


export default UploadSingleImage