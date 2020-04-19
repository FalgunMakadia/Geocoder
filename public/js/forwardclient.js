console.log('Client side Forward Geocoding java script!')

const forwardForm = document.querySelector('form')
const search = document.querySelector('input')
const m1 = document.querySelector('#m1')
const m2 = document.querySelector('#m2')

forwardForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    fetch('/forwardprocess?location=' + encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
        if(data.error){
            m1.textContent = 'Error : '+data.error
            m2.textContent = ''
        } else {
            m1.textContent = 'Location : '+data.place
            m2.textContent = 'Latitude : '+data.latitude+' || Longitude : '+data.longitude
            
        }
    }) 
})
})