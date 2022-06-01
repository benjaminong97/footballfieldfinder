// initialise map
let map = createMap();

L.marker([1.4111904827071984, 103.8439297963851]).addTo(map);

//get data from theark.json
window.addEventListener('DOMContentLoaded', async function(){
    let arkData = await getData('data/theark.json');
    let arkPlaces = arkData.places;
    for (place of arkPlaces){
        placeName = place.name;
        placeLocation = place.location
        console.log(placeLocation)
    }
})

// https://api.data.gov.sg/v1/transport/carpark-availability