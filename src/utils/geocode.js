//Here i have maintained the pre ES6 version for reference

const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidmF0c2FsbWVodGEiLCJhIjoiY2s4dGh2YmJqMDBmcjNscGlhaGJ2NGcxaiJ9.kxq_6fC3HLY-uNV_bCh94w&limit=1'
    request( { url : url, json : true}, (error, response) => {
        if(error) {
            callback('unable to connect to locationcl services api!', undefined)
        } else if (response.body.features.length === 0){
            callback('Unable to find location. Try another search!', undefined)
        } else {
            callback(undefined, {
                latitude :  response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        } 
    })
}

module.exports = geocode