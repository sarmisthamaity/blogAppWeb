import React, { useEffect, useState } from 'react'
import { useCookies } from "react-cookie";
import Card from "react-bootstrap/Card";
import axios from 'axios';
import './blog.css';
import { useHistory, Link } from 'react-router-dom';


const GetOneUser = () => {
    const history = useHistory();
    const [userData, setUserData] = useState({ container: [] });

    const Token = localStorage.getItem('Token');

    
    useEffect(() => {
        // console.log(formData);
        const config = {
            headers: {
                authorization: Token
            }
        };

        const userPost = () => {
            axios.get('http://127.0.0.1:8080/allBlogs', config)
                .then(response => {
                    // alert(response.data.message)
                    // console.log(response.data, 'vvvv');
                    setUserData({ container: response.data.userBlog })
                }).catch(err => {
                    console.log(err);
                })
        }
        userPost();
    }, [])


    // console.log(userData, 'dadaert');

    const renderUserData = (card, index) => {
        const imageUrl = `http://127.0.0.1:8080/${card.image}`
        // console.log(imageUrl, 'fffff')
        return (

            <Card style={{ width: "22rem" }}>
                <Card.Img variant="top" style={{ width: '15rem', height: '15rem' }} src={imageUrl} />
                <Card.Body>

                    <Card.Title style={{ color: "green" }} key = {index}>{card.blog}</Card.Title>

                    {/* <button>edit</button> */}

                    {/* <div className="button">
                        <button onClick={() => history.push('/editContent')}>edit</button>
                    </div> */}


                    {/* <Card.Subtitle className="mb-2 text-muted">
                    
    
                    </Card.Subtitle> */}

                    <Card.Text>

                    </Card.Text>

                    <Link to={{pathname: `${'/editContent'}?ID=${card._id}`}}>
                        <button>Edit Post</button>
                    </Link>

                    {/* <Card.Link href="">
                        <button className='edit'>edit</button>
                    </Card.Link> */}

                </Card.Body>
            </Card>
        )

    }


    return (
        <div>
            {/* <img src={image} alt="hello" /> */}
            {userData.container.map(renderUserData)}
        </div>
    )
    // )
}



export default GetOneUser;