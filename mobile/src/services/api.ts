import axios from 'axios';
import { API_BASE } from '@env';

const api = axios.create({
  baseURL: `${API_BASE}/data/2.5`,
});

export default api;
