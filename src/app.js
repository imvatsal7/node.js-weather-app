//Here we learn to send back regular text, json and html

const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials') // tovhange the default views directory changing the name and relative location

//define handle bar engine and view location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather app',
        name : 'Vatsal Mehta'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Vatsal Mehta'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        helpText : 'This is some useful text',
        title : 'Help',
        name : 'Vatsal Mehta'
    })
})
//this won't get executed once the index.html has veen created and been used

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error : 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { //deconstruct the data variable.
        //use default params incase you have an error or else the program will crash!
        if(error) {
            return res.send({error}) //shorthand es6 notation
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location : location,
                address :  req.query.address
            })
        })
    })
})


//example on how to render the query string data
app.get('/products' , (req, res) => {

    if(!req.query.search) {
       return res.send({
            error : 'You must provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products :[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Vatsal Mehta',
        errorMessage : 'Help article not found!'
    })
})
//Always write this code at the end as the 
app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Vatsal Mehta',
        errorMessage : 'Page not found!'
    })
})

// app.get('/help', (req, res) => {
//     res.send({ 
//         name : 'Vatsal',
//         age: 26
//     })
// })

// app.get('/about', (req, res)  => {
//     res.send('<h1>About</h1>')
// })

app.get('/Weather', (req, res) => {
    res.send({
        forecast : '50 degrees',
        location : 'Philadelphia'
    })
})
//app.com
//app.com/help
//app.com/about and  so on...


app.listen(3000, () => {
    console.log('Server is up and running on port 3000.')
})