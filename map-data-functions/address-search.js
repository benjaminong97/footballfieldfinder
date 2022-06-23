//instantiate coordinates for the home marker
let homeMarkerCoordinates = []

//instantiate home marker variable 
let homeMarker = "placeholder"

document.querySelector('#address-btn').addEventListener('click', async function () {
    let locationQuery = document.querySelector('#floatingInputGrid').value
    
    //use mapbox api to get coordinates from the search query
    let response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${locationQuery.replace(/ /g, "%20")}.json?country=sg&limit=1&access_token=pk.eyJ1IjoiaGV5aXRzYm9uZyIsImEiOiJjbDNzY3Awb20xaHByM2lrY3k3dXkyYzY4In0.WpE8u5nGJfX_qlSsrRBO4w`)
    
    //if type of address is street address
    if (document.querySelector("#address-select").value == "street_address") {


        //check if address is valid
        if (locationQuery == "" || locationQuery.length < 3 || (response.data.features.length == 0) ) {

            //if error message exists, remove to avoid duplicates
            if (document.querySelector('#alert-div')) {
                document.querySelector('#home-address-search-container').removeChild(document.querySelector('#alert-div'))
            }

            //create error message and display for user
            let alertDiv = document.createElement('div')
            alertDiv.innerHTML = `Please enter a valid address: Address must be in Singapore and have at least 3 characters.`
            alertDiv.id = 'alert-div'
            alertDiv.style = 'color: red; background-color:pink; outline:2px solid red; border-radius: 5px'
            alertDiv.classList.add('mt-2')
            document.querySelector('#home-address-search-container').appendChild(alertDiv)
        }

        else {
            //remove previous homemarker from map
            if (typeof homeMarker != 'string') {
                map.removeLayer(homeMarker)
            }

            //if error message exists, remove
            if (document.querySelector('#alert-div')) {
                document.querySelector('#home-address-search-container').removeChild(document.querySelector('#alert-div'))
            }


            // hide all pages
            let pages = document.querySelectorAll('.page');
            for (let p of pages) {
                p.classList.remove('show')
                p.classList.add('hidden')
            }

            // change selected tab
            document.querySelector('#map-tab').classList.add('active')
            document.querySelector('#address-tab').classList.remove('active')


            // show map
            document.querySelector('#map-container').classList.add('show')

            // show search
            document.querySelector('#search-container').classList.remove('search-hidden')
            document.querySelector('#search-container').classList.add('show')




            //account for bad searches
            if (response.data.features[0] != undefined) {
                let lat = response.data.features[0].geometry.coordinates[1]
                let long = response.data.features[0].geometry.coordinates[0]
                let nameString = response.data.features[0].place_name
                // let object = {
                //     "address": carparkAddress,
                //     "latitude": lat,
                //     "longitude": long,
                //     "postalCode": postalCode,
                // }
                map.flyTo([lat, long], 16)
                let homeIcon = L.icon({
                    iconUrl: 'data/icons/home.png',
                    iconSize: [60, 60],
                })
                homeMarker = L.marker([lat, long], { icon: homeIcon })
                homeMarkerCoordinates = [lat, long]
                homeMarker.addTo(map)

                await getWeather(lat, long)

                await getNearby(lat, long)


            }
        }
    }

    //if type of address is postal code
    else {
        //remove white spaces
        locationQuery = locationQuery.replace(/\s/g, '')

        //check if postalcode is valid
        if (locationQuery.length != 6 || !(Number(locationQuery)) || (response.data.features.length == 0)) {

            //if error message exists, remove to avoid duplicates
            if (document.querySelector('#alert-div')) {
                document.querySelector('#home-address-search-container').removeChild(document.querySelector('#alert-div'))
            }

            //create error message and display for user
            let alertDiv = document.createElement('div')
            alertDiv.innerHTML = `Please enter a valid postal code, a postal code must be a 6 digit number`
            alertDiv.id = 'alert-div'
            alertDiv.style = 'color: red; background-color:pink; outline:2px solid red; border-radius: 5px'
            alertDiv.classList.add('mt-2')
            document.querySelector('#home-address-search-container').appendChild(alertDiv)
        }

        else {
            //remove previous homemarker from map
            if (typeof homeMarker != 'string') {
                map.removeLayer(homeMarker)
            }

            //if error message exists, remove
            if (document.querySelector('#alert-div')) {
                document.querySelector('#home-address-search-container').removeChild(document.querySelector('#alert-div'))
            }


            // hide all pages
            let pages = document.querySelectorAll('.page');
            for (let p of pages) {
                p.classList.remove('show')
                p.classList.add('hidden')
            }

            // change selected tab
            document.querySelector('#map-tab').classList.add('active')
            document.querySelector('#address-tab').classList.remove('active')


            // show map
            document.querySelector('#map-container').classList.add('show')

            // show search
            document.querySelector('#search-container').classList.remove('search-hidden')
            document.querySelector('#search-container').classList.add('show')



            //use mapbox api
            let response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${locationQuery.replace(/ /g, "%20")}.json?country=sg&limit=1&access_token=pk.eyJ1IjoiaGV5aXRzYm9uZyIsImEiOiJjbDNzY3Awb20xaHByM2lrY3k3dXkyYzY4In0.WpE8u5nGJfX_qlSsrRBO4w`)
            if (response.data.features[0] != undefined) {
                let lat = response.data.features[0].geometry.coordinates[1]
                let long = response.data.features[0].geometry.coordinates[0]
                let postalCode = response.data.features[0].context[0].text

                map.flyTo([lat, long], 16)
                let homeIcon = L.icon({
                    iconUrl: 'data/icons/home.png',
                    iconSize: [60, 60],
                })
                homeMarker = L.marker([lat, long], { icon: homeIcon })
                homeMarkerCoordinates = [lat, long]
                homeMarker.addTo(map)
                await getNearby (lat, long)
                await getWeather(lat, long)
            }
        }
    }




})

