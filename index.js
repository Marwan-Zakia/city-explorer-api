'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const weatherData = require('./Weather.json');
const axios = require('axios');
const server = express();
server.use(cors());

const PORT = process.env.PORT||3000;

server.get('/weather', getWhether);
function getWhether(req, res) {
      let query = req.query.city;
      let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${query}&key=${process.env.key}`;
    
      axios
      .get(url)
      .then( result => {
        
        let newWeather =  result.data.data.map(item => {
          return new Weather(item.weather.description, item.valid_date,item.low_temp,item.high_temp);
        })
    
        
        res.send(newWeather)
    })
      .catch(err => console.log(err))
    }
    

    class Weather {
     constructor (description,date,low_temp,high_temp){
        this.description = `Low of ${low_temp}, high of${high_temp} with ${description}`
        this.date=date;
      }}

//
server.get('/movie', getmovie);
async function getmovie(req, res) {
      let title = req.query.title;
      let url2 = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.kay}&query=${title}`;
    
      axios
      .get(url2)
      .then( result => {
          
          let newMovie =  result.data.results.map(item => {
              return new Movie(item.title, item.overview,item.poster_path);
            })
            res.send(newMovie)
            console.log(newMovie)
            
    })
      .catch(err => console.log(err))
    }

    class Movie {
     constructor (title,poster_path,overview){
        this.title = title;
        this.poster_path=poster_path;
        this.overview=overview;
      }}
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
    
