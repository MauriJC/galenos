import axios from 'axios';
///https://galenodiagnosticos.herokuapp.com



export default axios.create({
    baseURL: 'http://localhost:3001/'
}
);