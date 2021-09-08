
const axios = require('axios');
let cleass=require('./weatherclass')
let weather=function (req, res) {
    let query1 = req.query.city;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${query1}&key=${process.env.key}`;
  
    axios
    .get(url)
    .then( result => {
      
      let newWeather =  result.data.data.map(item => {
        return new cleass(item.weather.description, item.valid_date,item.low_temp,item.high_temp);
      })
  
      
      res.send(newWeather)
      
  })
    .catch(err => console.log(err))
  }


module.exports = weather