import axios from 'axios';
import {API_BASE, API_KEY} from '@env';

const weatherKey = API_KEY;

const api = axios.create({
  baseURL: `${API_BASE}/data/2.5`,
});

export {api, weatherKey};
