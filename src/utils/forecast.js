const request = require('postman-request')

const forecast = (lat, long, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=7326a5892905130000e90daef49698f3&query=${encodeURIComponent(lat)},${encodeURIComponent(long)}&units=f`

    request({ url, json: true}, (error, {body}) => {

        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const descriptions = body.current.weather_descriptions[0]
            const {temperature, precip, feelslike} = body.current
            callback(undefined, `${descriptions}. It is currently ${temperature} degrees out but it feels like ${feelslike}. There is a ${precip}% chance of rain.`)
        }
    
    })
}

module.exports = forecast