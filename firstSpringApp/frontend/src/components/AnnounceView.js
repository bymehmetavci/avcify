import React from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import {Link} from 'react-router-dom';
import {format} from 'timeago.js';
import { useTranslation } from 'react-i18next';

const AnnounceView = (props) => {
    const {announce} = props;
    const {user, content, addedDate, fileAttachment} =  announce;
    const {username, displayName, image} = user;

    const {i18n} = useTranslation();
    const formatted = format(addedDate, i18n.language);

    return (
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
            </div>
            <div className="pl-5">
                {content}
            </div>
            {fileAttachment && (
                <div className="pl-5">
                    <img className="img-fluid" src={'images/' + fileAttachment.name} alt={content} />
                </div>
            )}
        </div>
    );
};

export default AnnounceView;