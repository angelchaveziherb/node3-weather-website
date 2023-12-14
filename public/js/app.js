const weatherForm = document.querySelector('form')
const search = weatherForm.querySelector('input')

const locationElem = document.querySelector('#location')
const forecastElem = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    
    locationElem.textContent = 'Loading location forecast data'
    forecastElem.textContent = ''
    
    fetch(`/weather?address=${location}`).then((res) => {

        res.json().then((data) => { 
            
            if (data.error) {
                locationElem.textContent = data.error
                return
            }
            
            locationElem.textContent = data.location
            forecastElem.textContent = data.forecast


        })

    })


})