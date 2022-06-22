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

        let carparkHTML = document.createElement('div')
        carparkHTML.innerHTML = `
        <div class="container d-flex justify-content-center">
        <img style="max-height:50px" src="data/icons/hdb-carpark.png">
        </div>
        <h5 class="mt-3">${carparkAddress}</h5> 
        <h6>Singapore ${carparkPostalCode}</h6>
        `
        let carparkButton = document.createElement('div')
        carparkButton.innerHTML = '<button class="btn btn-outline-success"><img style="max-width: 40px" src="data/icons/directions.png">   Take me here!</button>'
        carparkButton.classList.add('container', 'd-grid', 'mx-auto')
        carparkButton.addEventListener('click', function () {
    
          controller.spliceWaypoints(0, 2)
          controller.setWaypoints([L.latLng(homeMarkerCoordinates[0], homeMarkerCoordinates[1]),
          L.latLng(lat, long)])
          controller.addTo(map)
          getWeather(lat, long)
          getNearby(lat, long)
    
        })
        carparkHTML.appendChild(carparkButton)
    
        marker.bindPopup(carparkHTML)
        marker.addTo(carparkClusterGroup)
    }
    carparkClusterGroup.addTo(carparkLayerGroup)
    return(carparkLayerGroup)
}
