import React, { useState } from 'react';
import './profile.css';
import { useCookies } from 'react-cookie';
import axios from 'axios';


const EditProfileUi = () => {
    const [bio, setBio] = useState('');
    const [cookies, setCookies] = useCookies(["Token"]);
    const [image, setImage] = useState('');

    const formData = new FormData();
    
    const EditUserProfile = e => {
        formData.append('bio', bio);
        formData.append('file', image);


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
        <div className='profile'>
            <h2> Edit User Profile</h2>
            <input type="text" id='bio' placeholder='write here.....' onChange={event => {
                const { value } = event.target;
                setBio(value)
            }} />
            <div className='profilePic'>
                {/* <user/> */}
                {/* <i class="fas fa-user-circle"></i> */}
                <input type="file" placeholder='image' onChange={event => {
                    const image = event.target.files[0]
                    setImage(image)
                }} />
            </div>
            <div className='button' onClick={function (e) { EditUserProfile(e) }}>edit</div>
        </div>
    )
}



export default EditProfileUi;