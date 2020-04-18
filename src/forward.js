const request = require('request')

const forward_geocoding = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(location) +'.json?access_token=pk.eyJ1IjoiZmFsZ3VubWFrYWRpYTgwIiwiYSI6ImNrOG4yaXRzdTBsMjczZm8yY3Z3ZW53aWoifQ.QEPvbwx3KUH4rSG9X4cPBA'

    request({ url, json: true }, (error, response) => {
        if(error){
            callback('Can not connect to the network!', undefined)
        } else if(response.body.features.length === 0){
            callback('Unable to find location. Try another search.')
        } else {
             callback(undefined, {
                 latitude: response.body.features[0].center[1],
                 longitude: response.body.features[0].center[0],
                 place: response.body.features[0].place_name
             })
        }
    })
}

// forward_geocoding('Surat Gujarat', (error, data) => {
//     if(error){
//         return console.log(error)
//     }
//     console.log(data)
// })

module.exports = forward_geocoding