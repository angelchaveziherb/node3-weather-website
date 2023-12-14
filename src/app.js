const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require(path.join(__dirname, './utils/forecast'))
const geocode = require(path.join(__dirname, './utils/geocode'))

const app = express()
const port = process.env.PORT || 3000


//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsParth = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsParth)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Angel Chavez'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Angel Chavez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Center',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        name: 'Angel Chavez'
    })
})

app.get('/weather', (req, res) => {
    const {address} = req.query

    if(!address) {
        res.send({
            error: 'please provide an address'
        })
        return
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
    
        if (error){
            res.send({
                error: 'Sorry. There was an error with the address info you submitted.'
            })
            return
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({
                    error: 'Sorry. There was an error retrieving the forecast data for this address'
                })
              return  
            }

            res.send({
                forecast: forecastData,
                address,
                location
            })
            
        })
    
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
        return
    }
 
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('help', {
        message: 'No help article found for this search',
        title: 'Article not found',
        name: 'Angel Chavez'
    })
})


app.get('*', (req, res) => {
    res.render('help', {
        message: 'No page found for this search',
        title: 'Page not Found',
        name: 'Angel Chavez'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})
