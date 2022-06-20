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


    // }
    // else if (placeFacilities.includes('  ')) {
    //     let placeFacilitiesArray = placeFacilities.split('  ')
    //     for (facility of placeFacilitiesArray) {
    //         facilitiesString += `<li>${facility}</li>`
    //     }
    // }


    {/* <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div> */}

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
            <div class="accordion-body">
            <h5>Address:</h5><h5>${placeAddress}, Singapore ${placePostalCode}</h5>
            <h5 class="text-success">Details and Facilities:</h5> ${facilitiesString} 
            </br>
            <h5>Booking:</h5>
            <a href="https://www.myactivesg.com/" target="_blank">https://www.myactivesg.com/</a>
            </div>
            </div>
            
            </div>
            </div>
            </br>
            `

    let goToPlayButton = document.createElement('div')
    goToPlayButton.innerHTML = '<button class="btn btn-primary">Bring me here!</button>'
    goToPlayButton.classList.add('container', 'd-grid', 'gap-2', 'col-6', 'mx-auto')
    goToPlayButton.addEventListener('click', function () {
      // L.Routing.control({
      //     waypoints: [
      //       L.latLng(1.34, 103.824),
      //       L.latLng(1.341, 103.800)
      //     ],
      //     router: L.Routing.mapbox('pk.eyJ1IjoiaGV5aXRzYm9uZyIsImEiOiJjbDQ1OGh3ZGYwMnBrM2RtcHowNzExb2x6In0.nYmo8E72bvcLOppTOiuwpw')
      //   }).addTo(map);
      // let controller = L.Routing.control({
      //     waypoints : [L.Routing.Waypoint[homeMarkerCoordinates[0], homeMarkerCoordinates[1]],
      //     L.Routing.Waypoint[placeCoordinates[0], placeCoordinates[1]]] ,
      //     router: L.Routing.mapbox('pk.eyJ1IjoiaGV5aXRzYm9uZyIsImEiOiJjbDQ1OGh3ZGYwMnBrM2RtcHowNzExb2x6In0.nYmo8E72bvcLOppTOiuwpw'),
      //     createMarker: function() { return null; },
      // })
      controller.spliceWaypoints(0, 2)
      controller.setWaypoints([L.latLng(homeMarkerCoordinates[0], homeMarkerCoordinates[1]),
      L.latLng(placeCoordinates[0], placeCoordinates[1])])
      controller.addTo(map)

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
