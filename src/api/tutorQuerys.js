import axios from './axios';

export const updateState = (n,id) => axios.put(`/tutor/state/${n}`);
