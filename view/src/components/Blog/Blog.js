import React, { useState } from 'react';
import axios from 'axios';
import './blog.css'
// import { eventNames } from '../../logger';


// const UploadSingleImage = () => {
    
//     const [file, setFile] = useState();
//     const [name, setName] = useState();
//     let formData;
//     const onFormSubmit = e => {
//         e.preventDefault();

//         formData = new FormData();
//         formData.append('file', file)
//         formData.append('name', name)
//         console.log(formData, 'oooooo');
//     }

//     const onInputChange = e => {
//         setFile(e.target.files[0])
//     }

//     const config = {
//         headers: {
//             'content-type': 'multipart/form-data'
//         },
//     };
//     const imageUpload = () => {
//         axios.post('http://127.0.0.1:8080/blogs', formData, config)
//             .then(resp => {
//                 alert(resp)
//                 console.log(resp);
//             }).catch(err => {
//                 alert(err)
//                 console.log(err);
//             })
//     }

//     return (
//         <div className="upload File">
//             <form onSubmit={onFormSubmit}>
//                 <h1> Blog post </h1>
//                 <input type="text" placeholder= "Enter About Blog" onChange={ event => {
//                     const {value} = event.target;
//                     setName(value)
//                 }}/>
//                 <br/> 
//                 <br/>
//                 <input type="file" name="image" onChange={onInputChange} />
//                 <button type="submit" onClick={ imageUpload }> Upload </button>
//             </form>

//         </div>
//     )
// }

// export default UploadSingleImage;



const UploadSingleImage = () => {
    const [blog, setBlog] = useState();
    const [picture, setPicture] = useState();

    const Send = event => {
        // console.log('Hey');
        const formData = new FormData();
        formData.append("blog", blog);
        formData.append("file", picture)
        console.log(formData);
        axios.post('http://127.0.0.1:8080/blogs', formData)
    }

    return(
        <div className="imageUpload">
            <header className= "App-header">
                <form action= "#">
                    <div className="flex">
                        <label htmlFor="name"> Name </label>
                            <input type="text" id="name" onChange={ event => {
                                const {value} = event.target
                                setBlog(value)
                            }}/>
                    </div>
                    <br/>
                    <div className="flex">
                            <label htmlFor="file"> File </label>
                            <input type="file" onChange= { event => {
                                const picture = event.target.files[0]
                                setPicture(picture)
                            }}></input>
                    </div>
                </form>
                <br/>
                <button onClick={Send}>Send</button>
            </header>

        </div>
    )


}


export default UploadSingleImage