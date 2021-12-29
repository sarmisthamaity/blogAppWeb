
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as ReactBootstrap from 'react-bootstrap';
import './blog.css'
import Card from "react-bootstrap/Card";


const AllPostBlogs = () => {
    const [data, setData] = useState({ dataContainer: [] });
    const [image, setImage] = useState('')
    useEffect(() => {
        const Datas = async () => {
            await axios.get('http://127.0.0.1:8080/allUsersBlogs')
                .then((result) => {
                    // console.log(result.data.allData, 'bbbbbbb');
                    setData({ dataContainer: result.data.allData })
                    // setImage(`http://127.0.0.1:8080/${resp.data.userProfile.image}`)
                }).catch((err) => {
                    console.log(err);

                })
        }
        Datas();
    }, [setData]);
    // console.log(data, 'data')

    const renderCard = (card, index) => {
        const imageUrl = `http://127.0.0.1:8080/${card.image}`
        return (
            <div className='container' >
                <div className='card-img-top'>
                    <div className="card mb-4">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={imageUrl} className="img-fluid rounded-start" />
                            </div>
                            <div className="col-md-4">
                                <div className="card-body">
                                    {card.user.map(name => {
                                        return (
                                            <h5 className="card-title">{`created by: ${name.name}`}</h5>
                                        )
                                    })}
                                </div>
                                <div className='card-body'>
                                    <p className="card-text">{card.blog}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
    return (
        <div>
            {data.dataContainer.map(renderCard)}
        </div>
    );
}



export default AllPostBlogs;