import axios from 'axios';

//
//http://b321-2803-9800-9441-ba78-4cd8-6d5d-2490-a9ac.ngrok.io

export default axios.create({
    baseURL: 'https://galenodiagnosticos.herokuapp.com/'
}
);