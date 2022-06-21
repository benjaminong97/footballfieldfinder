async function getHDBCarparks(){
    //reading in the data we created in carpark-json-creator.js

    let carparkData = await getData('data/hdb-carpark.json')
    let carparkClusterGroup = L.markerClusterGroup()
    let carparkLayerGroup = L.layerGroup()
    for (carpark of carparkData) {
        let carparkAddress = carpark.address
        let lat = carpark.latitude
        let long = carpark.longitude
        let carparkPostalCode = carpark.postalCode
        let carparkIcon = L.icon({
            iconUrl:'data/icons/hdb-carpark.png',
            iconSize:[30,30],
        })
        let marker = L.marker([lat, long], {icon: carparkIcon})
        marker.bindPopup(`<div class="container d-flex justify-content-center"><img style="max-height:50px" src="data/icons/hdb-carpark.png"></div><h5 class="mt-3">${carparkAddress}</h5> <h6>Singapore ${carparkPostalCode}</h6>`)
        marker.addTo(carparkClusterGroup)
    }
    carparkClusterGroup.addTo(carparkLayerGroup)
    return(carparkLayerGroup)
}
