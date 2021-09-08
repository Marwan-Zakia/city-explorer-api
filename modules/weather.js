

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


module.exports = getWhether;