import React, { useState } from 'react';
import axios from 'axios';
import './profile.css'
import { useCookies } from "react-cookie";



const UploadProfile = () => {

    const [bio, setBio] = useState();
    // const [picture, setPicture] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const Token = localStorage.getItem('Token')

    const Upload = event => {
        const formData = new FormData();
        formData.append("bio", bio);
        formData.append("file", selectedImage)
        // console.log(formData, cookies);
        const config = {
            headers: {
                authorization: Token
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


    // const EditUserProfile = event => {

    //     // const [bio, setBio] = useState();
    //     // const [picture, setPicture] = useState();
    //     // const [cookies, setCookie] = useCookies(["Token"]);


    //     const formData = new FormData();

    //     formData.append('bio', bio);
    //     formData.append('file', picture);


    //     const config = {
    //         headers: {
    //             authorization: Token
    //         }
    //     };

    //     axios.put('http://127.0.0.1:8080/editprofile', formData, config)
    //         .then((result) => {
    //             // console.log(result.data, 'mmmmmmm');
    //             alert("success")
    //         }).catch((err) => {
    //             // console.log(err, 'jjjjjjj');
    //         })
    // }

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const removeSelectedImage = () => {
        setSelectedImage();
    };


    return (
        <div className='centered'>
            <div className="profile">
                <h1> profile Picture </h1>
                <input type="text" id="bio" placeholder="write your bio" onChange={event => {
                    const { value } = event.target
                    setBio(value)
                }} />
                <br />
                <br />
                {/* <div className='image'>
                    <input type="file" onChange={event => {
                        const picture = event.target.files[0]
                        setPicture(picture)
                    }}></input>
                </div> */}
                <div style={styles.container}>
                    <input
                        accept="image/*"
                        type="file"
                        onChange={imageChange}
                    />
                    {selectedImage && (
                        <div style={styles.preview}>
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                style={styles.image}
                                alt="Thumb"
                            />
                            <button onClick={removeSelectedImage} style={styles.delete}>
                                Remove This Image
                            </button>
                        </div>
                    )}
                </div>
                <br />
                <br />
                <button onClick={Upload}>Send</button>
                <div> or</div>
                {/* <button onClick={EditUserProfile}>edit</button> */}

            </div>
        </div>
    )
}


export default UploadProfile


// https://fontawesome.com/v5.15/icons/user?style=duotone


const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 50,
    },
    preview: {
        marginTop: 50,
        display: "flex",
        flexDirection: "column",
    },
    image: { maxWidth: "100%", maxHeight: 320, height: '200px', width: '200px' },
    delete: {
        cursor: "pointer",
        padding: 15,
        background: "red",
        color: "white",
        border: "none",
    },
};