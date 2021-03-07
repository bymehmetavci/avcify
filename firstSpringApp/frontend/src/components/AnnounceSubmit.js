import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import {postAnnouncement} from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ButtonWithProgress from './ButtonWithProgress';

const AnnounceSubmit = () => {
    const {image} = useSelector(store=> ({image: store.image}));
    const [focused, setFocused] = useState(false);
    const [announce, setAnnounce] = useState('');
    const[errors, setErrors] = useState({});
    const {t} = useTranslation();

    useEffect(()=> {
        if(!focused) {
            setAnnounce('');
            setErrors({});
        }
    }, [focused]);

    useEffect(()=> {
        setErrors({})
    }, [announce]);

    const pendingApiCall = useApiProgress('post', '/api/1.0/announcements');

    const onCLickAnnounce = async () => {
        const body = {
            content: announce
        }
        try {
            await postAnnouncement(body);
            setFocused(false);
        } catch(error) {
            if(error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            }
        }
    }
    let textAreaClass = 'form-control';
    if(errors.content) {
        textAreaClass += ' is-invalid';
    }
    return (
        <div className="card p-1 flex-row">
            <ProfileImageWithDefault className="rounded-circle mr-1" image={image} width="32" height="32" />
            <div className="flex-fill">
                <textarea 
                    className={textAreaClass} 
                    rows={focused ? '3' : '1'} 
                    onFocus={()=> setFocused(true)} 
                    onChange={(event) => setAnnounce(event.target.value)}
                    value={announce}
                />
                <div className="invalid-feedback">
                    {errors.content}
                </div>
                {focused && (
                    <div className="text-right mt-2">
                        <ButtonWithProgress
                            className="btn btn-sm btn-primary" 
                            onClick={onCLickAnnounce}
                            text='Announce'
                            pendingApiCall={pendingApiCall}
                            disabled={pendingApiCall}
                        />
                        <button 
                            className="btn btn-sm btn-light d-inline-flex ml-2" 
                            onClick={()=>setFocused(false)}
                        >
                                <span className="material-icons">close</span>
                                {t('Cancel')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnnounceSubmit;