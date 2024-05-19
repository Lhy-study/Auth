import axios from 'axios';

export const request = axios.create({
    baseURL:process.env.BASEDOMAIN,
    timeout:1000 * 30,
    withCredentials:true,
});