'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherData = require('./modules/weather');

const movieData = require('./modules/movie');
const server = express();
server.use(cors());

const PORT = process.env.PORT||3001;

server.get('/weather',weatherData);
console.log(weatherData)
server.get('/movie', movieData);
server.get('/', (req, res) => {
    res.send('Hello from the home route')
});
server.get('*', (req, res) => {
    res.status(404).send({
      code: 404,
      message: 'not found'
    })
  })
      

server.listen(PORT, () => {
    console.log(`Hello, I am listening on ${PORT}`);
})