import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:9000/api',
    withCredentials: true,
})

export default instance