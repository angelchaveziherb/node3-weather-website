const request = require('postman-request')

const geocode = (address, callback) => {
    const url =  `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW5nZWxjaGF2ZXppaGVyYiIsImEiOiJjbHBzeGN1MTMwNm5yMmxwYWpmdDB3MHphIn0.GkZkT0d69BWKi4YDDX6oRg&limit=1`

    request({ url, json: true}, (error, {body}) => {

        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (!body.features.length) {
            callback('Unable to find location!', undefined)
        } else {
            const {place_name: location} = body.features[0]
            const [long, lat] = body.features[0].center

            callback(undefined, {
                longitude:long,
                latitude: lat, 
                location: location
            })

        }
    })

}

module.exports = geocode