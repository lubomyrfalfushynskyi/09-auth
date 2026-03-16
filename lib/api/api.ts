import axios from 'axios';

// Use relative path for API to work with any origin
const baseURL = '/api';

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
