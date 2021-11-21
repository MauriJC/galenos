import axios from 'axios';
///https://galenodiagnosticos.herokuapp.com



export default axios.create({
    baseURL: 'http://159.223.186.3/'
}
);