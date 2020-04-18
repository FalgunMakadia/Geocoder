const request = require('request')

const backward_geocoding = (latitude, longitude, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+longitude+','+latitude+'.json?access_token=pk.eyJ1IjoiZmFsZ3VubWFrYWRpYTgwIiwiYSI6ImNrOG4yaXRzdTBsMjczZm8yY3Z3ZW53aWoifQ.QEPvbwx3KUH4rSG9X4cPBA'

    request({ url, json:true }, (error, response) => {
        if(error) {
            callback('Can not connect to the network.', undefined)
        } else if(response.body.features === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                place: response.body.features[0].place_name
            })
        }
    })
}

// backward_geocoding(21.17, 72.83, (error, data) => {
//     if(error){
//         return console.log(error)
//     }
//     console.log(data)
// })

module.exports = backward_geocoding