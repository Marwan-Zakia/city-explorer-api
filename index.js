'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const weatherData = require('./Weather.json');
const axios = require('axios');
const server = express();
server.use(cors());

const PORT = process.env.PORT||3000;

server.get('/hot', getWhether);
function getWhether(req, res) {
      let query = req.query.city;
      let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${query}&key=${process.env.key}`;
    
      axios
      .get(url)
      .then( result => {
        
        let newPhoto =  result.data.data.map(item => {
          return new Photo(item);
        })
    
        
        res.send(newPhoto)
    })
      .catch(err => console.log(err))
    }
    
    server.get('*', (req, res) => {
      res.status(404).send({
        code: 404,
        message: 'not found'
      })
    })
    
    server.get('/', (req, res) => {
    res.send('Hello from the home route')
});
function Photo(item) {

    this.description= `Low of ${item.data.low_temp}, high of${item.data.high_temp} with ${item.data.weather.description}`
    this.date=item.data.date;
  }


// server.get('/citynames', (req, res) => {
//     const name = req.query.name;
//     const lat  = req.query.lat;
//     const lon =req.query.lon;

//     const result = weatherData.find((item) => {
//         if (item.city_name === name || item.lat === lat ||item.lon === lon )
//             {return item;}
//     })}

    
    //   .catch(err => console.log(err))
    // }
    
    // server.get('*', (req, res) => {
    //   res.status(404).send({
    //     code: 404,
    //     message: 'not found'
    //   })
    // })
    
    
    server.get('*',(req,res)=>{
        res.status(404).send('Sorry, page not found');
    })
    
    server.listen(PORT, () => {
        console.log(`Hello, I am listening on ${PORT}`);
    })