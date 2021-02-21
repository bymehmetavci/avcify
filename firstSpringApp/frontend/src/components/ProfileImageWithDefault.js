import React from 'react';
import defaultPicture from '../assets/profile.png';

const ProfileImageWithDefault = (props) => {
    const {image} = props;
    let imageSource = defaultPicture;
    if(image) {
        imageSource = image;
    }
    return (
        <img alt={`Profile`} src={imageSource} {...props}/>
        //className="rounded-circle" width="32" height="32"
    );
};

export default ProfileImageWithDefault;