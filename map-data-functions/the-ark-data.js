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
        placePitchNumber = place.field[1]
        placePitchType = place.field[0]
        let arkIcon = L.icon({
            iconUrl: 'data/icons/football-icons/theark.png',
            iconSize: [50, 50]
        })
        let arkHTML = document.createElement('div')

        // differentiate text for 1 pitch or many pitches
        if (placePitchNumber == 1) {
            arkHTML.innerHTML = `
            <div class="card" style="width: 10rem;">
            <img src="data/icons/football-icons/theark.png" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${placeName}</h5>
                <h6 class= "card-subtitle mb-2">${placeLocation}</h6>
                <h6 class="card-text">${placePitchType[0].toUpperCase() + placePitchType.slice(1)}: ${placePitchNumber} Pitch</h6>
                <a href="https://theark.sg/" class="btn btn-warning text-" target="_blank">Booking</a>
            </div>
            </div>
            `
        }
        else {
            arkHTML.innerHTML = `
            <div class="card" style="width: 10rem;">
            <img src="data/icons/football-icons/theark.png" class="card-img-top p-3">
            <div class="card-body">
                <h5 class="card-title">${placeName}</h5>
                <h6 class= "card-subtitle mb-2">${placeLocation}</h6>
                <h6 class="card-text">${placePitchType[0].toUpperCase() + placePitchType.slice(1)}: ${placePitchNumber} Pitches</h6>
                <a href="https://theark.sg/" class="btn btn-warning text-" target="_blank">Booking</a>
            </div>
            </div>
            `
        }
        arkHTML.classList.add('container')
        arkHTML.setAttribute('align', 'center')
        
        let arkButton = document.createElement('div')
        arkButton.innerHTML = '<button class="btn btn-outline-success"><img style="max-width: 40px" src="data/icons/directions.png">   Take me here!</button>'
        arkButton.classList.add('container', 'd-grid', 'mx-auto', 'mt-3')
        arkButton.addEventListener('click', function (){
    
          controller.spliceWaypoints(0, 2)
          controller.setWaypoints([L.latLng(homeMarkerCoordinates[0], homeMarkerCoordinates[1]),
          L.latLng(placeCoordinates[0], placeCoordinates[1])])
          controller.addTo(map)
          getWeather(placeCoordinates[0], placeCoordinates[1])
            
        })
        console.log(placeCoordinates)

        arkHTML.appendChild(arkButton)

        let marker = L.marker(placeCoordinates, { icon: arkIcon })
        marker.bindPopup(arkHTML)


        marker.addTo(arkClusterGroup)
    }
    arkClusterGroup.addTo(arkLayerGroup)

    return (arkLayerGroup)
}
