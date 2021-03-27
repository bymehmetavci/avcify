import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import {getAnnouncements, getNewAnnounceCount, getNewAnnouncements, getOldAnnouncements} from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import AnnounceView from './AnnounceView';
import Spinner from './Spinner';

const AnnounceFeed = () => {
    const [announcePage, setAnnouncePage] = useState({ content: [], last: true, number: 0});
    const [newAnnounceCount, setNewAnnounceCount] = useState(0);
    const {t} = useTranslation();
    const {username} = useParams();

    const path = username ? `/api/1.0/users/${username}/announcements?page=` : '/api/1.0/announcements?page=';
    const initialAnnounceLoadProgress = useApiProgress('get', path);

    let lastAnnounceId = 0;
    let firstAnnounceId = 0;
    if(announcePage.content.length > 0) {
        firstAnnounceId = announcePage.content[0].id;
        const lastAnnounceIndex = announcePage.content.length - 1;
        lastAnnounceId = announcePage.content[lastAnnounceIndex].id;
    }
    const oldAnnouncePath = username ? `/api/1.0/users/${username}/announcements/${lastAnnounceId}` : `/api/1.0/announcements/${lastAnnounceId}`;
    const loadOldAnouncesProgress = useApiProgress('get', oldAnnouncePath, true);

    const newAnnouncePath = username ? `/api/1.0/users/${username}/announcements/${firstAnnounceId}?direction=after` : `/api/1.0/announcements/${firstAnnounceId}?direction=after`;
    const loadNewAnouncesProgress = useApiProgress('get', newAnnouncePath, true);

    useEffect(() => {
        const getCount = async () => {
            const response = await getNewAnnounceCount(firstAnnounceId, username);
            setNewAnnounceCount(response.data.count);
        };
        let looper = setInterval(getCount, 2000);
        return function cleanup() {
            clearInterval(looper);
        };
    }, [firstAnnounceId, username]); 

    useEffect(() => {
        const loadAnnouncements = async page => {
            try {
                const response = await getAnnouncements(username, page);
                setAnnouncePage(previousAnnouncePage => ({
                    ...response.data,
                    content: [...previousAnnouncePage.content, ...response.data.content]
                }));
            } catch (error) {
                
            }
        };
        loadAnnouncements();
    },[username]);

    const loadOldAnnouncements = async () => {
        const response = await getOldAnnouncements(lastAnnounceId, username);
        setAnnouncePage(previousAnnouncePage => ({
            ...response.data,
            content: [...previousAnnouncePage.content, ...response.data.content]
        }));
    };

    const loadNewAnnouncements = async () => {
        const response = await getNewAnnouncements(firstAnnounceId, username);
        setAnnouncePage(previousAnnouncePage => ({
            ...previousAnnouncePage,
            content: [...response.data, ...previousAnnouncePage.content]
        }));
        setNewAnnounceCount(0);
    };

    const onDeleteAnnounceSuccess = id => {
        setAnnouncePage(previousAnnouncePage => ({
            ...previousAnnouncePage,
            content: previousAnnouncePage.content.filter((announce) => announce.id !== id)
        }));
    }

    const {content, last} = announcePage;

    if(content.length === 0) {
        return <div className="alert alert-secondary text-center">{initialAnnounceLoadProgress ? <Spinner /> : t('There are no announcements in your timeline')}</div>;
    }
    return (
        <div>
            {newAnnounceCount > 0 && (
                <div 
                    className="alert alert-secondary text-center mb-2" 
                    style={{cursor: loadNewAnouncesProgress ? 'not-allowed' : 'pointer'}} 
                    onClick={loadNewAnouncesProgress ? () => { } : loadNewAnnouncements}
                >
                    {loadNewAnouncesProgress ? <Spinner /> :  t('There are new announcements')}
                </div>
            )}
            {content.map(announce => {
                return <AnnounceView key={announce.id} announce={announce} onDeleteAnnounce={onDeleteAnnounceSuccess}/>;
            })}
            {!last && (
                <div 
                    className="alert alert-secondary text-center" 
                    style={{cursor: loadOldAnouncesProgress ? 'not-allowed' : 'pointer'}} 
                    onClick={loadOldAnouncesProgress ? () => { } : loadOldAnnouncements}
                >
                    {loadOldAnouncesProgress ? <Spinner /> : t('Load old announcements') }
                </div>)}
        </div>
    );
};

export default AnnounceFeed;