import axios from './axios';


export const obtenerDatosDeAPI = (setData) => {

  





    axios.get(`/tutores`)
      .then(response => {
        const apiData = response.data;
        console.log('Data de la API:', apiData);
        setData(apiData);
      })
      .catch(error => {
        console.error('Error al obtener datos de la API', error);
      });
  };


export const registerRequest = user => axios.post(`/register`, user);


export const loginRequest  = user => axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get('/verify')

