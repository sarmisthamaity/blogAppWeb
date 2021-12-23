
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as ReactBootstrap from 'react-bootstrap';

import Card from "react-bootstrap/Card";

const AllPostBlogs = () => {
    const [data, setData] = useState({ dataContainer: [] });
    const [image, setImage] = useState('')
    useEffect(() => {
        const Datas = async () => {
            await axios.get('http://127.0.0.1:8080/blogComments')
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

    // console.log(data.dataContainer, 'aaaa');


    const renderCard = (card, index) => {
        // console.log((card.image), "card")
        // console.log(index, "index")
        const imageUrl = `http://127.0.0.1:8080/${card.image}`
        return (     

            <Card style={{ width: "22rem" }}>
                <Card.Img variant="top" style={{width: '5rem', height: '5rem'}} src={imageUrl}/>
                <Card.Body>
                
                    <Card.Title style={{ color: "green" }}>{card.blog}</Card.Title>

                    {card.user.map((ke, i) => {
                        {/* console.log(ke, 'ooo'); */ }
                        return (
                            <Card.Subtitle className="mb-2 text-muted" key={i}>
                                {ke.name}
                                {/* {console.log(ke.name, 'yyyyyy')} */}

                            </Card.Subtitle>
                        )
                    })}

                    {card.comment.map((k, n) => {
                        return ( 
                        <Card.Text key={n}>
                            {k.comment}
                            {/* {console.log(k.comment, 'zzzzzzzzz')} */}
                        </Card.Text>
                       ) 
                    })}
                    
                    {/* <Card.Link href="#"> comment</Card.Link> */}
                </Card.Body>
            </Card>
        )
    }

    return (
        <div>
            {data.dataContainer.map(renderCard)}
        </div>
    );
}


export default AllPostBlogs;