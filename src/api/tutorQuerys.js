import axios from './axios';

export const updateState = (n,rut) => {
    console.log("Query puteado");
    axios.put(`/tutores/updateState/${n}/${rut}`);}
