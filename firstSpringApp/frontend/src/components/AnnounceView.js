import React, { useState } from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import {Link} from 'react-router-dom';
import {format} from 'timeago.js';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { deleteAnnounce } from '../api/apiCalls';
import Modal from './Modal';
import { useApiProgress } from '../shared/ApiProgress';

const AnnounceView = (props) => {
    const loggedInUser = useSelector(store => store.username);
    const {announce, onDeleteAnnounce} = props;
    const {user, content, addedDate, fileAttachment, id} =  announce;
    const {username, displayName, image} = user;
    const [modalVisible, setModalVisible] = useState(false);

    const pendingApiCall = useApiProgress('delete', `/api/1.0/announcements/${id}`, true);

    const {i18n, t} = useTranslation();
    
    const onClickDelete = async () => {
        await deleteAnnounce(id);
        onDeleteAnnounce(id);
    }

    const onClickCancel = () => {
        setModalVisible(false);
    }

    const formatted = format(addedDate, i18n.language);

    const ownedByLoggedInUser = loggedInUser === username;

    return (
        <>
            <div className="card p-1 mb-1">
                <div className="d-flex">
                    <ProfileImageWithDefault className="rounded-circle m-1" image={image} width="32" height="32"/>
                    <div className="flex-fill m-auto pl-2">
                        <Link to={`/user/${username}`} className="text-dark">
                            <h6 className="d-inline">
                                {displayName}
                            </h6>
                            <span> - </span>
                            <span>{formatted}</span>
                        </Link>
                    </div>
                    {ownedByLoggedInUser && (<button className="btn btn-delete-link btn-sm" onClick={() => setModalVisible(true)}>
                        <span className="material-icons">delete_outline</span>
                    </button>)}
                </div>
                <div className="pl-5">
                    {content}
                </div>
                {fileAttachment && (
                    <div className="pl-5">
                        {fileAttachment.fileType.startsWith('image') && (
                            <img className="img-fluid" src={'images/attachments/' + fileAttachment.name} alt={content} />
                        )}
                        {!fileAttachment.fileType.startsWith('image') && (
                            <strong>TODO: This announce contains not supported attachment</strong>
                        )}
                    </div>
                )}
            </div>
            <Modal 
                visible={modalVisible}
                onClickCancel={onClickCancel}
                onClickOk={onClickDelete}
                title={t('Delete Announce')}
                message={
                    <div>
                        <div>
                            <strong>{t('Are you sure to delete announce?')}</strong>
                        </div>
                        <span>{content}</span>
                    </div>
                }
                pendingApiCall={pendingApiCall}
                okButton={t('Delete Announce')}
            />
        </>
    );
};

export default AnnounceView;