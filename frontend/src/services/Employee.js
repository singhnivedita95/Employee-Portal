import axios from 'axios';
import config from './../config';

export const getAll = (options) => {
    return axios.get(`${config.apiUrl.employee}`, { headers: { "Access-Control-Allow-Origin": "*", ...options } });
}

export const add = (data) => {
    return axios.post(`${config.apiUrl.employee}`, data, { headers: { "Access-Control-Allow-Origin": "*" } });
}

export const edit = (id, data) => {
    return axios.put(`${config.apiUrl.employee}/${id}`, data, { headers: { "Access-Control-Allow-Origin": "*" } });
}

export const remove = (id) => {
    return axios.delete(`${config.apiUrl.employee}/${id}`, { headers: { "Access-Control-Allow-Origin": "*" } });
}