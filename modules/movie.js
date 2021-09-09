const express = require('express');
const cors = require('cors');
require('dotenv').config();
const server = express();
server.use(cors());
const axios = require('axios');
let movieMemory = {};
let newmovie= require('./movieclass')
let getmovie = async function (req, res) {
  let title = req.query.title;
  if (movieMemory[title] !== undefined) {
    res.send(movieMemory[title]);
  } 
  else {
    let url2 = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.kay}&query=${title}`;
  
    axios
    .get(url2)
    .then( result => {
        
        let newMovie =  result.data.results.map(item => {
            return new newmovie(item.title, item.overview,item.poster_path);
          })
          movieMemory[title] = newMovie;
          res.send(newMovie)
          
          
  })
    .catch(err => console.log(err))
  }}


  module.exports = getmovie;