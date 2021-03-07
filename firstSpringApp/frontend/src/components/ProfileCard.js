import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { useTranslation } from 'react-i18next';
import Input from './Input';
import {updateUser} from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';
import {updateSuccess} from '../redux/authActions'

const ProfileCard = props => {
    const [inEditedMode, setInEditeMode] = useState(false);
    const [updatedDipslayName, setUpdatedDisplayName] = useState();
    const {username: loggedInUsername} = useSelector((store)=>({username: store.username}));
    const [user,setUser] = useState({});
    const [editable, setEditable] = useState(false);
    const [newImage, setNewImage] = useState();
    const [validationErrors, setValidationErrors] = useState({});
    const dispatch = useDispatch();

    const routeParams = useParams();
    const pathUsername = routeParams.username;

    useEffect(()=> {
        setUser(props.user);
    }, [props.user]);

    useEffect(() => {
        setEditable(pathUsername === loggedInUsername);
    }, [pathUsername, loggedInUsername]);

    useEffect(() => {
        setValidationErrors(previousValidationErrors => ({
            ...previousValidationErrors,
            displayName: undefined
        }));
    }, [updatedDipslayName]);

    useEffect(() => {
        setValidationErrors(previousValidationErrors => ({
            ...previousValidationErrors,
            image: undefined
        }));
    }, [newImage]);

    const {username, displayName, image} = user;
    
    const {t} = useTranslation();

    useEffect(()=> {
        if(!inEditedMode) {
            setUpdatedDisplayName(undefined);
            setNewImage(undefined);
        } else {
            setUpdatedDisplayName(displayName);
        }
    }, [inEditedMode, displayName]);

    const onClickSave = async () => {
        let image;
        if(newImage) {
            //Image Array after split -> ['data:image/jpeg;base64', '/9j/4AAQSkZJRgABAQAAAQABAAD/2w...']
            image = newImage.split(',')[1];
        }
        const body = {
            displayName: updatedDipslayName,
            image
        };
        try {
            const response = await updateUser(username, body);
            setInEditeMode(false);
            setUser(response.data);
            dispatch(updateSuccess(response.data));
        } catch (error) {
            setValidationErrors(error.response.data.validationErrors);
        }
    };

    const onChangeFile = (event) => {
        if(event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result); 
        }
        fileReader.readAsDataURL(file);
    };

    const pendingApiCall = useApiProgress('put','/api/1.0/users' + username);
    const {displayName : displayNameError, image: imageError} = validationErrors;
    return (
        <div className="card text-center">
            <div className="card-header">
                <ProfileImageWithDefault 
                    className="rounded-circle shadow" 
                    width="128" 
                    height="128" 
                    alt={`${username} profile`} 
                    image={image}
                    tempimage={newImage}
                />
            </div>
            <div className="card-body">
                {!inEditedMode && (
                    <>
                        <h4>{displayName} - {username}</h4>
                        {editable && (
                            <button className="btn btn-success d-inline-flex" onClick={()=>setInEditeMode(true)}>
                                <span className="material-icons">edit</span>
                                {t('Edit')}
                            </button>
                        )}
                    </>
                )}
                {inEditedMode && (
                    <div>
                        <Input 
                            label={t('Change Display Name')} 
                            defaultValue={displayName} 
                            onChange={event => {
                                setUpdatedDisplayName(event.target.value);
                            }}
                            error={displayNameError}
                        />
                        <Input type="file" onChange={onChangeFile} error={imageError}/>
                        <div>
                            <ButtonWithProgress 
                                className="btn btn-primary d-inline-flex"
                                onClick={onClickSave}
                                disabled={pendingApiCall}
                                pendingApiCall={pendingApiCall}
                                text = {
                                    <>
                                        <span className="material-icons">save</span>
                                        {t('Save')}
                                    </>
                                }
                            />
                            <button 
                                className="btn btn-light d-inline-flex ml-2" 
                                onClick={()=>setInEditeMode(false)}
                                disabled={pendingApiCall}
                            >
                                    <span className="material-icons">close</span>
                                    {t('Cancel')}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default ProfileCard;