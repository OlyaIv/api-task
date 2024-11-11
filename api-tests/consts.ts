import axios from 'axios';

export const BASE_URL = 'http://api.mathjs.org/v4/';

export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
