class Weather {
    constructor (description,date,low_temp,high_temp){
       this.description = `Low of ${low_temp}, high of${high_temp} with ${description}`
       this.date=date;
     }}
     module.exports = Weather;