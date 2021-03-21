import React from 'react';
import '../assets/scss/AutoUploadImage.scss';

const AutoUploadImage = (props) => {
    const {image, uploading} = props;
    return (
        <div className="overlay-div-container">
            <img className="img-thumbnail" src={image} alt="announce-attachment"/>
            <div className="overlay" style={{opacity: uploading ? 1 : 0}}>
                <div className="d-flex justify-content-center h-100">
                    <div className="spinner-border text-light m-auto">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AutoUploadImage;