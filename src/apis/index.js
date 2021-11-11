import axios from 'axios';

export default axios.create({
    baseURL: 'https://galenodiagnosticos.herokuapp.com/'
}
);