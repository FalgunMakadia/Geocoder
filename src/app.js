const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forward = require('./forward')
const backward = require('./backward') 

const app = express()

const pathToPublic = path.join(__dirname, '../public')
const pathToViews = path.join(__dirname, '../templates/views')
const pathToPartials = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', pathToViews)
app.use(express.static(pathToPublic))
hbs.registerPartials(pathToPartials)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Index',
        name: 'Falgun Makadia'
    })
})

app.get('/forward', (req, res) => {
    res.render('forward', {
        name: 'Falgun Makadia',
        title: 'Forward Geocoding'
    })
})

app.get('/forwardprocess', (req, res) => {
    const location = req.query.location
    if(!location){
        return res.send({error: 'Location is not provided!'})
    }
    forward(location, (error, data) => {
        if(error) {
            return res.send({error})
        }
        const {latitude, longitude, place} = data
        res.send({
            latitude,
            longitude,
            place
        })
    })
})

app.get('/backward', (req, res) => {
    res.render('backward', {
        name: 'Falgun Makadia',
        title: 'Backward Geocoding'
    })
})

app.get('/backwardprocess', (req, res) => {
    const latitude = req.query.lati
    const longitude = req.query.longi
    if((!latitude) || (!longitude)){
        return res.send({error: 'Provided co-ordinate pair is incomplete.'})
    }
    backward(latitude, longitude, (error, data) => {
        if(error) {
            return res.send({error})
        }
        res.send({
            place: data.place
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Falgun Makadia',
        title: 'About'
    })
})

app.listen(3000, () => {
    console.log('Geocode server is up on port 3000>>>')
})