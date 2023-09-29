import axios from 'axios';

const fetch = () => {
    const defaultOptions = {
        baseURL: 'http://localhost:3001/',
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Create instance
    let instance = axios.create(defaultOptions);

    // Set the AUTH token for any request
    instance.interceptors.request.use(function (config) {
        const user = JSON.parse(localStorage.getItem('user'))
        config.headers.Authorization = user?.token ? `Bearer ${user.token}` : '';
        return config;
    });

    return instance;
};

export default fetch();