//get data from theark.json
async function getArkGroup() {
    let arkClusterGroup = L.markerClusterGroup()
    let arkLayerGroup = L.layerGroup()
    let arkData = await getData('data/theark.json');
    let arkPlaces = arkData.places;
    for (place of arkPlaces) {
        placeName = place.name;
        placeLocation = place.location
        placeCoordinates = place.coordinates
        let arkIcon = L.icon({
            iconUrl: 'data/icons/theark.png',
            iconSize: [50,50]
        })
        let marker = L.marker(placeCoordinates, {icon: arkIcon})
        marker.bindPopup(`<h2>${placeName}</h2> <p>${placeLocation}<p>`)
        marker.addTo(arkClusterGroup)
    }
    arkClusterGroup.addTo(arkLayerGroup)

    return (arkLayerGroup)
}
