//get in the stuff from playsg
async function getPlaySGGroup(){
    let playsgData = await getData('data/playsg.geojson')
    let playsgDataArray = playsgData.features
    console.log(playsgDataArray)
    let playsgGroup = L.featureGroup.subGroup(clusterGroup)
    // let  playsgLayerGroup = L.layerGroup()
    for (place of playsgDataArray) {
        let placeCoordinates = place.geometry.coordinates.reverse()
        let playsgIcon = L.icon({
            iconUrl: 'data/icons/activesg.png',
            iconSize: [100,60]
        })
    //     var map = L.map("map"),
    //     mcgLayerSupportGroup = L.markerClusterGroup.layerSupport(options),
    //     myLayerGroup = L.layerGroup(arrayOfMarkers);
        
    // mcgLayerSupportGroup.addTo(map);
    // mcgLayerSupportGroup.checkIn(myLayerGroup); // <= this is where the magic happens!
    
    // myLayerGroup.addTo(map);
        let marker = L.marker(placeCoordinates, 
            {icon: playsgIcon, pane: 'markerPane'})
        let placeName = place.properties.Name
        let placeDescription = place.properties.description
        let placeAddress = place.properties.ADDRESSSTREETNAME
        marker.bindPopup(`<h2>${placeName}</h2><p>${placeDescription}</p>`)
        marker.addTo(playsgGroup)
        
        
    }
    
    playsgGroup.addTo(map)

    
    return (playsgGroup)
}
