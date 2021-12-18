import React, { useState } from 'react';
import axios from 'axios';
import './blog.css'

import { useCookies } from "react-cookie";


const UploadSingleImage = () => {
    const [blog, setBlog] = useState();
    const [picture, setPicture] = useState();

    const [cookies, setCookie] = useCookies(["Token"]);

    const formData = new FormData();

    const Send = event => {
        formData.append("blog", blog);
        formData.append("file", picture)
        
        // console.log(formData, cookies);
        const config = {
            headers: {
                authorization: cookies.Token
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
    
    const editBlog = event => {
        formData.append("blog", blog);
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
                console.log(err, 'jjjjj');
            })
    }



    return (
        <div className="blog">
            <h1> Blog Post </h1>
            <input type="text" id="blog" placeholder="About Your Post" onChange={event => {
                const { value } = event.target
                setBlog(value)
            }} />
            <br/>
            <input type="file" onChange={event => {
                const picture = event.target.files[0]
                setPicture(picture)
            }}></input> 
            <br/>
            <button onClick={Send}>Send</button>
            <div> or</div>
            <button onClick={editBlog}>edit</button>
        </div>
    )

    // return(
    //     <div className="imageUpload">
    //         <header className= "App-header">
    //             <form action= "#">
    //                 <div className="flex">
    //                     <label htmlFor="name"> Name </label>
    //                         <input type="text" id="name" onChange={ event => {
    //                             const {value} = event.target
    //                             setBlog(value)
    //                         }}/>
    //                 </div>
    //                 <br/>
    //                 <div className="flex">
    //                         <label htmlFor="file"> File </label>
    //                         <input type="file" onChange= { event => {
    //                             const picture = event.target.files[0]
    //                             setPicture(picture)
    //                         }}></input>
    //                 </div>
    //             </form>
    //             <br/>
    //             <button onClick={Send}>Send</button>
    //         </header>
    //     </div>
    // )
}


export default UploadSingleImage