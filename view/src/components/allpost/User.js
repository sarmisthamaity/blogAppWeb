import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";


const GetUserProfile = () => {
    const [image, setImage] = useState('');
    const [content, setContent] = useState({ data: [] })
    const Token = localStorage.getItem('Token');

    const config = {
        headers: {
            authorization: Token
        }
    }

    useEffect(() => {
        const userData = async () => {
            await axios.get('http://127.0.0.1:8080/userprofile')
                .then((resp) => {
                    // console.log(resp.data.url, 'xxxxxxx');
                    // console.log(resp.data.userProfile.image, 'uuuuu');
                    // console.log(resp.data)
                    setContent({ data: resp.data.userProfile })
                    // alert('get data')
                    setImage(`http://127.0.0.1:8080/${resp.data.userProfile.image}`)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        userData()
    }, [setContent])

    
    return (
        <div>
            <img src={image} alt= "hello" />
            {/* <imag src= `'images/Screenshot from 2021-09-25 18-38-36.png'` />  */}
        </div>
    )
};




export default GetUserProfile;