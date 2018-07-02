// GLobal Variables
var latitudes = '40.7726606';
var longitudes = '-73.95555809999999';

// Location Form data
var LocationAppForm = document.getElementById('LocationAppForm');

// Listen the form submit
LocationAppForm.addEventListener('submit', geocodeLocation);

function geocodeLocation(event) {
    event.preventDefault();

    // Location data
    var location = document.getElementById('location').value;

    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: location,
            key: 'AIzaSyBMYUDvOtX7t_IPFco8GTMtisFrpT5mGKY'
        }
    })
    //drew lawrence county
    .then((response) => {
        console.log(response);

        // Check Status is not OK
        if(response.data.status !== 'OK') {
            document.getElementById('sections').innerHTML = '<h6>Opps! No result found for upper address</h6>';
        } else {
            // If status is OK
            document.getElementById('location').value = response.data.results[0].formatted_address;
        
            // Display Sections of Address
            var addressSections = response.data.results[0].address_components;
            var displayData = `<a target="_blank" href="/extra-files/display-main-map.html?lat=${latitudes}&lng=${longitudes}">Go to Map Location</a>`;
            displayData += '<ul class="list-group">';
                for(var i=0; i < addressSections.length; i++) {
                    displayData += `
                        <li class="list-group-item">
                            <b>${addressSections[i].types[0]}</b> - ${addressSections[i].long_name}
                        </li>
                    `;
                }
            displayData += '</ul>';                        
            document.getElementById('sections').innerHTML = displayData;            
            
            // initilize global variables
            latitudes = response.data.results[0].geometry.location.lat;
            longitudes = response.data.results[0].geometry.location.lng;
        }        
        
    })
    .catch((error) => {
        console.log(error);
    });
}