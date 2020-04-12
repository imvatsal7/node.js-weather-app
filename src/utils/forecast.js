const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=72e11e094f3428c7c2b7e3e44f166178&query=' + latitude + ',' + longitude + '&units=f' 
    request({ url, json : true}, (error, {body})  => {
        if(error){
            callback('Unable to retriev the weather services!', undefined)
        }
        else if(body.error){
            callback('Unable to get the location, give a valid one', undefined)
        } else{
            callback(undefined, body.current.weather_descriptions[0] + " .The temperature currently is : " + body.current.temperature + " It feels like : " + body.current.feelslike)
        }
    })
}

module.exports = forecast