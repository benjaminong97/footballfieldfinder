//this has NOT BEEN FIXED --> ask TA when they are in --> if no way to read in http on https, download the static data separately
//getting bus stop data from LTA
//unable to resolve API issue --> api hosted on HTTP URL, API does not accept HTTPS, server requires HTTPS
//downloaded static file (json) of the data instead (bus stops generally not updated too often)
async function getBusStopData() {
    let busStopData = await getData('data/bus-stops.json')
    let busStopClusterGroup = L.markerClusterGroup()
    let busStopLayerGroup = L.layerGroup()
    busStopClusterGroup.addTo(busStopLayerGroup)
    for (busStop of busStopData.value) {
        let name = busStop.Description
        let street = busStop.RoadName
        let stopCode = busStop.BusStopCode
        let lat = busStop.Latitude
        let long = busStop.Longitude
        let busIcon = L.icon({
            iconUrl : 'data/icons/busstop.png',
            iconSize: [65,65],
            iconAnchor:   [20, 20],
            popupAnchor : [9,0]
        })
        let marker = L.marker([lat,long], {icon: busIcon})
        marker.bindPopup(`<h3>Bus Stop: ${name}</h3> <h4>Street: ${street} <br>Bus Stop Code: ${stopCode}</h4>`)
        marker.addTo(busStopClusterGroup)
    }
    return (busStopLayerGroup)
}


