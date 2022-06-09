async function getHDBCarparks(){
    //reading in the data we created in carpark-json-creator.js

    let carparkData = await getData('data/hdb-carpark.json')
    let carparkClusterGroup = L.markerClusterGroup()
    let carparkLayerGroup = L.layerGroup()
    for (carpark of carparkData) {
        let carparkAddress = carpark.address
        let lat = carpark.latitude
        let long = carpark.longitude
        let carparkIcon = L.icon({
            iconUrl:'data/icons/hdb-carpark.png',
            iconSize:[30,30],
        })
        let marker = L.marker([lat, long], {icon: carparkIcon})
        marker.bindPopup(`<h2>${carparkAddress}</h2>`)
        marker.addTo(carparkClusterGroup)
    }
    carparkClusterGroup.addTo(carparkLayerGroup)
    return(carparkLayerGroup)
}
