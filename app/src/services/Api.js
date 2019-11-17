import axios from 'axios';

export default () => {
  return axios.create({
    baseURL: `http://${window.location.hostname}:3001/`
  });
};