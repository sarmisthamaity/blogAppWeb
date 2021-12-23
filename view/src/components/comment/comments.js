import './comment.css'
import React, { useState } from 'react'
import axios from 'axios';




const Comment = () => {

    const Token = localStorage.getItem('Token');

    const [ Datas, setData ] = useState({
        comment: "",
        like: ""
    });

    const handleInput = ( e ) => {
        // console.log("whats' up");
        const { name, value } = e.target;
        setData({
            ...Datas,
            [ name ]: value
        })
        // console.log(name, 'iiii');
    };
    const config = {
        headers: {
            authorization: Token
        }
    };
    
    // console.log(config, 'uuuuu');

    const submit = (e) => {
        // const {comment, like } = Datas;
        // console.log(Datas);
        axios.post('http://127.0.0.1:8080/comments', Datas, config)
        .then((response) => {
            // console.log("name");
            alert(response.data.message)
            // console.log(response.data.message, "kkkkkk");
        }).catch((error) => {
            alert(error)
            // console.log(error);
        })
    }
    
    return (
        <div className='comment'>
        <h2> Comment On Blog</h2>
            <input type="text" name= "comment" value={ Datas.comment } onChange={ handleInput } placeholder='comment here' ></input>
            <input type="text" name= "like" value={ Datas.like } onChange={ handleInput } placeholder='like' ></input>

            <button onClick={ submit }>Submit</button>       
        </div>
    )
}



export default Comment;