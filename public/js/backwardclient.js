console.log('Client side Backward Geocoding java script!')

const forwardForm = document.querySelector('form')
const lati = document.querySelector('#i1')
const longi = document.querySelector('#i2')
const m1 = document.querySelector('#m1')

forwardForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const latitude = lati.value
    const longitude = longi.value
    fetch('/backwardprocess?lati='+encodeURIComponent(latitude)+'&longi='+encodeURIComponent(longitude)).then((response) => {
    response.json().then((data) => {
        if(data.error){
            m1.textContent = 'Error : '+data.error
        } else {
            m1.textContent = 'Location : '+data.place
        }
    }) 
})
})