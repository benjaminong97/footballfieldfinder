//get home marker longitude as an array
let homeMarkerCoordinates = []

document.querySelector('#address-btn').addEventListener('click', async function () {


    let pages = document.querySelectorAll('.page');
    for (let p of pages) {
        p.classList.remove('show')
        p.classList.add('hidden')
    }

    // hide landing page
    document.querySelector('#map-tab').classList.add('active')
    document.querySelector('#address-tab').classList.remove('active')


    // show map
    document.querySelector('#map-container').classList.add('show')

    let locationQuery = document.querySelector('#floatingInputGrid').value
    //use mapbox api
    let response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${locationQuery.replace(/ /g, "%20")}.json?country=sg&limit=1&access_token=pk.eyJ1IjoiaGV5aXRzYm9uZyIsImEiOiJjbDNzY3Awb20xaHByM2lrY3k3dXkyYzY4In0.WpE8u5nGJfX_qlSsrRBO4w`)
    if (response.data.features[0] != undefined) {
        let lat = response.data.features[0].geometry.coordinates[1]
        let long = response.data.features[0].geometry.coordinates[0]
        let postalCode = response.data.features[0].context[0].text
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
        let marker = L.marker([lat, long], { icon: homeIcon })
        homeMarkerCoordinates =[lat, long]
        marker.addTo(map)
        console.log('hi3')
    }})

