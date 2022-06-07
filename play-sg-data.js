//get in the stuff from playsg
async function getPlaySGGroup(){
    let playsgData = await getData('data/playsg.geojson')
    let playsgDataArray = playsgData.features
    console.log(playsgDataArray)
    let playsgGroup = L.layerGroup()
    for (place of playsgDataArray) {
        let placeCoordinates = place.geometry.coordinates.reverse()
        let playsgIcon = L.icon({
            iconUrl: 'data/icons/activesg.png',
            iconSize: [80,50]
        })
        //how to create custom icons
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
        let marker = L.marker(placeCoordinates, {icon: playsgIcon})
        let placeName = place.properties.Name
        let placeDescription = place.properties.description
        let placeAddress = place.properties.ADDRESSSTREETNAME
        marker.bindPopup(`<h2>${placeName}</h2><p>${placeDescription}</p>`)
        marker.addTo(playsgGroup)
        
    }
    playsgGroup.addTo(map)
    return (playsgGroup)
}
