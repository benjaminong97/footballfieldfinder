//get in the stuff from playsg
async function getPlaySGGroup() {
    let playsgData = await getData('data/playsg.geojson')
    let playsgDataArray = playsgData.features
    console.log(playsgDataArray)

    let playsgClusterGroup = L.markerClusterGroup()

    // let  playsgLayerGroup = L.layerGroup()
    for (place of playsgDataArray) {
        let placeCoordinates = place.geometry.coordinates.reverse()
        let playsgIcon = L.icon({
            iconUrl: 'data/icons/activesg.png',
            iconSize: [100, 60]
        })
            
        let marker = L.marker(placeCoordinates,
            { icon: playsgIcon })
        let placeName = place.properties.Name
        let placeDescription = place.properties.description
        let placeFacilities = placeDescription.split('Facilities:')[1]
        let placePostalCode = place.properties.ADDRESSPOSTALCODE
        let placeAddress = place.properties.ADDRESSSTREETNAME
        marker.bindPopup(`<h2>${placeName}</h2><h3>${placeAddress}, Singapore ${placePostalCode}</h3><p>Facilities: ${placeFacilities}</p>`)
        marker.addTo(playsgClusterGroup)

    }

    // playsgSubGroup.addTo(map)
    let playsgLayerGroup = L.layerGroup()
    playsgClusterGroup.addTo(playsgLayerGroup)
    playsgLayerGroup.addTo(map)
    return (playsgLayerGroup)
}
