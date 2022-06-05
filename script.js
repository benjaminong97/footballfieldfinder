// initialise map
let map = createMap();

L.marker([1.4111904827071984, 103.8439297963851]).addTo(map);

//get data from theark.json
window.addEventListener('DOMContentLoaded', async function(){
    let arkGroup = L.layerGroup()
    let arkData = await getData('data/theark.json');
    let arkPlaces = arkData.places;
    for (place of arkPlaces){
        placeName = place.name;
        placeLocation = place.location
        placeCoordinates = place.coordinates
        let marker = L.marker(placeCoordinates)
        marker.bindPopup(`<h2>${placeName}</h2> <p>${placeLocation}<p>`)
        marker.addTo(arkGroup)
    }
    arkGroup.addTo(map)
    


    let carparkData = await getData('https://api.data.gov.sg/v1/transport/carpark-availability')
    console.log(carparkData)


})

// https://api.data.gov.sg/v1/transport/carpark-availability

