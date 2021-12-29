import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';


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
            await axios.get('http://127.0.0.1:8080/userprofile', config)
                .then((resp) => {
                    // console.log(resp.data.Datas)

                    setContent({ data: resp.data.Datas })
                    // alert('get data')
                    setImage(`http://127.0.0.1:8080/${resp.data.Datas.image}`)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        userData()
    }, [])

    return (
        <div className="centered" style={{ backgroundColor: "lightsteelblue" }}>
            <MDBRow>
                <MDBCol lg='8' md='6' className='mb-2'>
                    <img
                        src={image}
                        className='rounded-circle'
                        alt=''
                        style={{
                            height: '200px',
                            width: '200px'
                        }}
                    />
                </MDBCol>

            </MDBRow>
        </div>
    )
};


export default GetUserProfile;