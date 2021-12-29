import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
    image: { maxWidth: "100%", maxHeight: 320 },
    delete: {
        cursor: "pointer",
        padding: 15,
        background: "red",
        color: "white",
        border: "none",
    },
};

const BlogCreate = () => {
    const [blog, setBlog] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const Token = localStorage.getItem('Token');
    const history = useHistory()
    const formData = new FormData();

    const Send = event => {
        formData.append("blog", blog);
        formData.append("file", selectedImage)

        const config = {
            headers: {
                authorization: Token
            }
        }

        axios.post('http://127.0.0.1:8080/blogs', formData, config)
            .then(response => {
                history.push('/')

            }).catch(err => {
                console.log(err);
            })
    };

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const removeSelectedImage = () => {
        setSelectedImage();
    };

    return (

        <section className="vh-100" style={{
            backgroundColor: 'white'
        }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-10 col-xl-9">
                        <div className="card text-black" style={{ borderRadius: 25 }}>
                            <div className="card-body p-md-5" style={{ color: 'black', borderRadius: 25, backgroundColor: 'lightgrey' }}>
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                            create blog
                                        </p>
                                        <form className="mx-1 mx-md-4">
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw" />
                                                <div className="form-outline flex-fill mb-0">
                                                    <div style={styles.container}>
                                                        <input
                                                            accept="image/*"
                                                            type="file"
                                                            onChange={imageChange}
                                                        />
                                                        {selectedImage && (
                                                            <div style={styles.preview}>
                                                                <img src={URL.createObjectURL(selectedImage)}
                                                                    style={styles.image}
                                                                    alt="Thumb" />
                                                                <button onClick={removeSelectedImage} style={styles.delete}>
                                                                    Remove This Image
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <input type="textarea" id="blog" placeholder="Write About Your Post" onChange={event => {
                                                const { value } = event.target
                                                setBlog(value)
                                            }} />
                                            <br />
                                            <br />
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" className="btn btn-primary btn-lg" onClick={Send}>
                                                    create
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj1cbtHrCxTGHJ4la-6fBeY670i0Drg92lUg&usqp=CAU"
                                            height='150%'
                                            width='120%'
                                            className="img-fluid"
                                            alt="Sample image"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


export default BlogCreate;