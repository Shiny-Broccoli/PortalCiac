import axios from './axios';


export const obtenerDatosDeAPI = (block, setData) => {

    // Obtener la fecha actual
    const actualDate = new Date();
    const dayIndex = actualDate.getDay();
    const days = ["DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];
    const blocks = ["1-2","3-4","5-6", "7-8", "9-10", "11-12", "13-14", "15-16"]

    const actualDay = days[dayIndex];
    console.log("El día de hoy es:", actualDay);

    axios.get(`/tutoresdia/${actualDay}/${block}`)
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

