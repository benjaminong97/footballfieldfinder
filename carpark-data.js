async function getHDBCarparks(){
    //reading in the data we created in carpark-json-creator.js

    let carparkData = await getData('data/hdb-carpark.json')
    let carparkLayer = L.layerGroup()
    for (carpark of carparkData) {
        let carparkAddress = carpark.address
        let lat = carpark.latitude
        let long = carpark.longitude

        let marker = L.marker([lat, long])
        marker.addTo(carparkLayer)

}}
let carparkGroup = getHDBCarparks()