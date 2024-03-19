import axios from 'axios';
import { BACKEND_URL } from '../config/URL';


const AxiosInstance = axios.create({
    timeout: 30000,
    baseURL: `${ import.meta.env.VITE_REACT_BACKEND_URL}/api/v1`,
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    },
});

export const getRequest = async (url: string) => {
    try {
        return await AxiosInstance({
            method: "get",
            url,
        });
    } catch (error: any) {
        let data = error.response && error.response.data;
        return { error: true, message: error.message, data: data };
    }
};

export const postRequest = async (url: string, data: any) => {

    try {
        return await AxiosInstance({
            method: "post",
            url,
            data: data
        });
    } catch (error: any) {
        let data = error.response && error.response.data;
        return { error: true, message: error.message, data: data };
    }
};

