import axios from 'axios';

// check if the environment is development, if it is, use the localhost:3000/api, otherwise use the /api
const BASE_URL = import.meta.env.VITE_API_URL === "development" ? 'http://localhost:3000/api' : "/api";

export const api = axios.create({
  baseURL: BASE_URL,
});