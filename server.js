'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherData = require('./Weather.json');

const server = express();
server.use(cors());

const PORT = 3000;



server.listen(PORT, () => {
    console.log(`Hello, I am listening on ${PORT}`);
})
server.get('/', (req, res) => {
    res.send('Hello from the home route')
})

server.get('/citynames', (req, res) => {
    const name = req.query.name;
    const lat  = req.query.lat;
    const lon =req.query.lon;

    const result = weatherData.find((item) => {
        if (item.city_name === name || item.lat === lat ||item.lon === lon )
            {return item;}
    })
    


  result.data.map((element) => {
        let newArr = [];
        newArr.push(new Forcast(element.weather.description, element.valid_date,element.low_temp,element.high_temp))
     
        res.status(200).send(newArr);

    });  
  


    
}) 
class Forcast  {
constructor(description,date,low_temp,high_temp){
this.description= `Low of ${low_temp}, high of${high_temp} with ${description}`
this.date=date;
}

}

server.get('*',(req,res)=>{
    res.status(404).send('Sorry, page not found');
})

