import React, { useState } from 'react';
import axios from 'axios';
import './profile.css'
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
                // console.log(response.data.message, 'vvvv');
            }).catch(err => {
                console.log(err);
            })
    }


    const EditUserProfile = event => {

        // const [bio, setBio] = useState();
        // const [picture, setPicture] = useState();
        // const [cookies, setCookie] = useCookies(["Token"]);


        const formData = new FormData();

        formData.append('bio', bio);
        formData.append('file', picture);


        const config = {
            headers: {
                authorization: cookies.Token
            }
        };

        axios.put('http://127.0.0.1:8080/editprofile', formData, config)
            .then((result) => {
                console.log(result.data, 'mmmmmmm');
                alert("success")
            }).catch((err) => {
                console.log(err, 'jjjjjjj');
            })
    }



    return (
        <div className="profile">
            <h1> profile Picture </h1>
            <input type="text" id="bio" placeholder="write your bio" onChange={event => {
                const { value } = event.target
                setBio(value)
            }} />
            <br />
            <br />
            <div className='image'>
                <input type="file" onChange={event => {
                    const picture = event.target.files[0]
                    setPicture(picture)
                }}></input>
            </div>
            <br />
            <br />
            <button onClick={Upload}>Send</button>
            <div> or</div>
            <button onClick={EditUserProfile}>edit</button>

        </div>
    )
}


export default UploadProfile


// https://fontawesome.com/v5.15/icons/user?style=duotone