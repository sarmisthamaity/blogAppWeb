import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import * as ReactBootstrap from 'react-bootstrap';

const AllUser = () => {


    const [image, setImage] = useState('');
    const [data, setData] = useState({ postData: [] })
    const [cookies, setCookie] = useCookies(["Token"]);

    const config = {
        headers: {
            authorization: cookies.Token
        }
    }

    useEffect(() => {
        const DataS = async() => {
            await axios.get("http://127.0.0.1:8080/alluser", config)
                .then((resp) => {
                    setData({ postData: resp.data.findUser })
                    alert('data get')
                }).catch(err => {
                    console.log(err);
                })
        }
        DataS()

    }, [setData])


    return (
        <ReactBootstrap.Table striped bordered hover>
            <thead>
                <tr>
                    <th>name</th>
                    <th>email</th>
                    <th>location</th>
                    <th>gender</th>
                </tr>
            </thead>
            <tbody>
                {data.postData && data.postData.map((item) => (
                    <tr key={item}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.gender}</td>
                        <td>{item.location}</td>
                    </tr>
                ))}

            </tbody>
        </ReactBootstrap.Table>
    )

};



export default AllUser;
