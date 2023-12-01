import axios  from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables()

const calendarApi = axios.create({
    baseURL: VITE_API_URL,
});

// TODO: configurar  interceptores
/*A la hora de hacer un request se necesita interceptar 
y añadir la configuración especifica que se ocupan 
en los header del x-token*/

calendarApi.interceptors.request.use( config => {
    config.headers ={
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }
    return config;
} );

export default calendarApi;