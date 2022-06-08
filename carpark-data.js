async function getHDBCarparks(){
    //reading in the data we created in carpark-json-creator.js

    let carparkData = await getData('data/hdb-carpark.json')
    let carparkLayer = L.layerGroup()
    for (carpark of carparkData) {
        let carparkAddress = carpark.address
        let lat = carpark.latitude
        let long = carpark.longitude
// var greenIcon = L.icon({
//     iconUrl: 'leaf-green.png',
//     shadowUrl: 'leaf-shadow.png',

//     iconSize:     [38, 95], // size of the icon
//     shadowSize:   [50, 64], // size of the shadow
//     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
//     shadowAnchor: [4, 62],  // the same for the shadow
//     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
// });
// L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);
        let carparkIcon = L.icon({
            iconUrl:'data/icons/hdb-carpark.png',
            iconSize:[30,30],
        })
        let marker = L.marker([lat, long], {icon: carparkIcon})
        marker.bindPopup(`<h2>${carparkAddress}</h2>`)
        marker.addTo(carparkLayer)
    }
    return(carparkLayer)
}
