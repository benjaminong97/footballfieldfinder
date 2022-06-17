//get in the stuff from playsg
async function getPlaySGGroup() {
    let playsgData = await getData('data/playsg.geojson')
    let playsgDataArray = playsgData.features
    console.log(playsgDataArray)

    let playsgClusterGroup = L.markerClusterGroup()

    // let  playsgLayerGroup = L.layerGroup()
    for (place of playsgDataArray) {
        //creating the markers
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
        let playButton = document.createElement('div')
        playButton.classList.add('container')
        playButton.innerHTML = `<h4>${placeName}</h4><h5>${placeAddress}, Singapore ${placePostalCode}</h5>
            <p>Facilities: ${placeFacilities}</p> <button class='btn btn-primary btn-sm'>Bring me here!</button>`
        marker.bindPopup()
        marker.addTo(playsgClusterGroup)

    }

    // playsgSubGroup.addTo(map)
    let playsgLayerGroup = L.layerGroup()
    playsgClusterGroup.addTo(playsgLayerGroup)
    playsgLayerGroup.addTo(map)
    return (playsgLayerGroup)
}
