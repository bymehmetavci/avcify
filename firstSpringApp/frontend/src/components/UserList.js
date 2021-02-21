import React, { useEffect, useState } from 'react';
import {getUsers} from '../api/apiCalls';
import {useTranslation} from 'react-i18next';
import UserListItem from "./UserListItem";
import { StaticRouter } from 'react-router-dom';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';

const UserList = () => {
    const [page, setPage] = useState({
        content: [],
        size: 6,
        number: 0
    });
    const [loadFailure, setLoadFailure] = useState(false);

    const pendingApiCall = useApiProgress('/api/1.0/users?page');

    useEffect(()=>{
        loadUsers();
    },[]);

    const onClickedNext = () => {
        const nextPage = page.number + 1;
        loadUsers(nextPage);
    };

    const onClickedPrevious = () => {
        const previousPage = page.number - 1;
        loadUsers(previousPage);
    };

    const loadUsers = async page => {
        setLoadFailure(false);
        try {
            const response = await getUsers(page);
            setPage(response.data);
        } catch (error) {
            setLoadFailure(true);
        }
    };

    const { t } = useTranslation();
    const { content: users, last, first} = page;
    
    let actionDiv = (
        <div>
            {first === false && (
                <button className="btn btn-sm btn-light" onClick={onClickedPrevious}>
                    {t('Previous')}
                </button>
            )}
            {last === false && (
                <button className="btn btn-sm btn-light float-right" onClick={onClickedNext}>
                    {t('Next')}
                </button>
            )}
        </div>
    );
    if(pendingApiCall) {
        actionDiv = <Spinner/>;
    }
    return (
        <>
        <div className="card">
            <h4 className="card-header text-center">{t('Users')}</h4>
            <div className="list-group-flush">
                {users.map(user => ( 
                    <UserListItem key={user.username} user={user}/>
                ))}
            </div>
        </div>
        {actionDiv}
        {loadFailure && <div className="text-center text-danger">{t('Load Failure')}!</div>}
        </>
    );
}

export default UserList;