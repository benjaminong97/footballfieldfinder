//get in the stuff from playsg
async function getPlaySGGroup() {
  //remove controller waypoints
  controller.setWaypoints([])

  let playsgData = await getData('data/playsg.geojson')
  let playsgDataArray = playsgData.features
  // console.log(playsgDataArray)

  let playsgClusterGroup = L.markerClusterGroup()

  // let  playsgLayerGroup = L.layerGroup()
  for (place of playsgDataArray) {
    //creating the markers
    let placeCoordinates = place.geometry.coordinates.reverse()
    let playsgIcon = L.icon({
      iconUrl: 'data/icons/activesg.png',
      iconSize: [100, 60]
    })


    let placeName = place.properties.Name
    let placeDescription = place.properties.description
    let placeFacilities = placeDescription.split('Facilities:')[1]
    let facilitiesString = ""

    if (typeof (placeFacilities) == 'string') {
      if (placeFacilities.includes(',')) {
        let placeFacilitiesArray = placeFacilities.split(',')
        placeFacilities = placeFacilitiesArray.join(' ')
      }

      if (placeFacilities.includes('  ')) {
        let placeFacilitiesArray = placeFacilities.split('  ')
        for (facility of placeFacilitiesArray) {
          facilitiesString += `<li class='list-group-item'>${facility}</li>`
        }
      }
      facilitiesString = facilitiesString.slice(33)
      facilitiesString = '<ul class="list-group">' + facilitiesString + '</ul>'
      // console.log(facilitiesString)
    }

    let placePostalCode = place.properties.ADDRESSPOSTALCODE
    let placeAddress = place.properties.ADDRESSSTREETNAME
    let playHTML = document.createElement('div')
    // playHTML.classList.add('container')
    playHTML.innerHTML = `
            <div class="accordion" id="accordionExample">
            <div class='accordion-item'>
            <h4 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            ${placeName}
            </button>
            </h4>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div class="accordion-body ">
            <img src="data/icons/activesg.png" style="max-width: 140px" class="rounded mx-auto d-block">
            <h5 class="font-italic">Address:</h5><h6>${placeAddress}, Singapore ${placePostalCode}</h6>
            <h5 class="font-italic mt-3">Details and Facilities:</h5> ${facilitiesString} 
            </br>
            <a href="https://members.myactivesg.com/bookfacility" class="btn btn-warning text-" target="_blank">Booking</a>
            </div>
            </div>
            
            </div>
            </div>
            </br>
            `

    let goToPlayButton = document.createElement('div')
    goToPlayButton.innerHTML = '<button class="btn btn-outline-success"><img style="max-width: 40px" src="data/icons/directions.png">   Take me here!</button>'
    goToPlayButton.classList.add('container', 'd-grid', 'mx-auto')
    goToPlayButton.addEventListener('click', function () {

      controller.spliceWaypoints(0, 2)
      controller.setWaypoints([L.latLng(homeMarkerCoordinates[0], homeMarkerCoordinates[1]),
      L.latLng(placeCoordinates[0], placeCoordinates[1])])
      controller.addTo(map)
      getWeather(placeCoordinates[0], placeCoordinates[1])

    })
    playHTML.appendChild(goToPlayButton)

    let marker = L.marker(placeCoordinates,
      { icon: playsgIcon })
    marker.bindPopup(playHTML)
    marker.addTo(playsgClusterGroup)


  }
  // playsgSubGroup.addTo(map)
  let playsgLayerGroup = L.layerGroup()
  playsgClusterGroup.addTo(playsgLayerGroup)
  playsgLayerGroup.addTo(map)
  return (playsgLayerGroup)
}
