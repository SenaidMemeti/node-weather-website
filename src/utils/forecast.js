const request = require('request')

const forecast = (latitude, longtitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=a032e785cfc861439ca148648c67db87&query='+ latitude + ',' + longtitude + 'units=f'
    request({ url, json: true }, (error, {body}) => {
    if(error){
        callback('Pas de connexion', undefined)
     }else if (body.error){
        callback('Unable to find location', undefined)
     }
     
     else{
        callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. There is ' + body.current.precip + '% chance of rain' )
  
     }

})}
module.exports = forecast