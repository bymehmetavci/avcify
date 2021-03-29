import axios from 'axios';

export const signup = body => {
    return axios.post('/api/1.0/users', body);
};
export const login = creds => {
    return axios.post('/api/1.0/auth', creds);
};
export const logout = () => {
    return axios.post('/api/1.0/logout');
};
export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
};
export const getUsers = (page = 0, size = 5) => {
    return axios.get(`/api/1.0/users?page=${page}&size=${size}`);
};
export const setAuthorizationHeader = ({isLoggedIn, token}) => {
    if(isLoggedIn) {
        const authorizationHeaderValue = `Bearer ${token}`
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    } else {
        delete axios.defaults.headers['Authorization'];
    }
};
export const getUser = username => {
    return axios.get(`/api/1.0/users/${username}`);
};
export const updateUser = (username, body) => {
    return axios.put(`/api/1.0/users/${username}`, body);
};
export const postAnnouncement = announce => {
    return axios.post('/api/1.0/announcements', announce);
};
export const getAnnouncements = (username, page = 0) => {
    const path = username ? `/api/1.0/users/${username}/announcements?page=` : '/api/1.0/announcements?page=';
    return axios.get(path + page);
};
export const getOldAnnouncements = (id, username) => {
    const path = username ? `/api/1.0/users/${username}/announcements/${id}` : `/api/1.0/announcements/${id}`;
    return axios.get(path);
};
export const getNewAnnounceCount = (id, username) => {
    const path = username ? `/api/1.0/users/${username}/announcements/${id}?count=true` : `/api/1.0/announcements/${id}?count=true`;
    return axios.get(path);
};
export const getNewAnnouncements = (id, username) => {
    const path = username ? `/api/1.0/users/${username}/announcements/${id}?direction=after` : `/api/1.0/announcements/${id}?direction=after`
    return axios.get(path);
};
export const postAnnounceAttachment = attachment => {
    return axios.post('/api/1.0/announce-attachments', attachment);
};
export const deleteAnnounce = id => {
    return axios.delete(`/api/1.0/announcements/${id}`);
};
export const deleteUser = username => {
    return axios.delete(`/api/1.0/users/${username}`);
}


