import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AnnounceFeed from '../components/AnnounceFeed';
import AnnounceSubmit from '../components/AnnounceSubmit';
import UserList from '../components/UserList';

const HomePage = () => {
    const {isLoggedIn} = useSelector(store => ({ isLoggedIn: store.isLoggedIn}));
    return (
        <div className="container">
            <div className="row">
                <div className="col-6 col-md-8">
                    {isLoggedIn && (
                        <div className="mb-1">
                            <AnnounceSubmit />
                        </div>
                    )}
                    <AnnounceFeed />
                </div>
                <div className="col-6 col-md-4">
                    <UserList />
                </div>
            </div>
        </div>
    );
};

export default HomePage;