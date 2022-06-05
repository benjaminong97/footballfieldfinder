//get in the stuff from playsg
window.addEventListener('DOMContentLoaded', async function(){
    let playsgData = await getData('data/playsg.geojson')
    let playsgDataArray = playsgData.features
    console.log(playsgDataArray)
    let playsgGroup = L.layerGroup()
    for (place of playsgDataArray) {
        let placeCoordinates = place.geometry.coordinates.reverse()
        let marker = L.marker(placeCoordinates)
        let placeName = place.properties.Name
        let placeDescription = place.properties.description
        let placeAddress = place.properties.ADDRESSSTREETNAME
        marker.bindPopup(`<h2>${placeName}</h2><p>${placeDescription}</p>`)
        marker.addTo(playsgGroup)
        
    }
    playsgGroup.addTo(map)

})