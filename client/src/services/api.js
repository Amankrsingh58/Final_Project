import axios from 'axios';

export default axios.create({
  baseURL: 'https://tutorbackend-i63e.onrender.com/api',
  headers: { 'Content-Type': 'application/json' },
});
