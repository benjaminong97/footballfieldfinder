async function getFutsalData() {
    let futsalData = await getData('data/other-futsal-pitches.json')
    let arrayOfPitches = futsalData.pitches
    let theArenaIcon = L.icon({
        iconUrl: 'data/icons/football-icons/thearena.png',
        iconSize: [80, 30]
    })
    let theCageIcon = L.icon({
        iconUrl: 'data/icons/football-icons/thecage.png',
        iconSize: [100, 50]
    })
    let skyParkIcon = L.icon({
        iconUrl: 'data/icons/football-icons/skyparkarena.png',
        iconSize: [120, 100]
    })
    let uberSportsIcon = L.icon({
        iconUrl: 'data/icons/football-icons/ubersports.png',
        iconSize: [135, 50]
    })
    let iconObject = {
        'The C': theCageIcon,
        'The A': theArenaIcon,
        'Sky P': skyParkIcon,
        'Uber ': uberSportsIcon
    }
    let theCageClusterGroup = L.markerClusterGroup()
    let theArenaClusterGroup = L.markerClusterGroup()
    let skyParkClusterGroup = L.markerClusterGroup()
    let uberSportsClusterGroup = L.markerClusterGroup()
    let theCageLayerGroup = L.layerGroup()
    let theArenaLayerGroup = L.layerGroup()
    let skyParkLayerGroup = L.layerGroup()
    let uberSportsLayerGroup = L.layerGroup()
    theCageClusterGroup.addTo(theCageLayerGroup)
    theArenaClusterGroup.addTo(theArenaLayerGroup)
    skyParkClusterGroup.addTo(skyParkLayerGroup)
    uberSportsClusterGroup.addTo(uberSportsLayerGroup)
    for (pitch of arrayOfPitches) {
        let name = pitch.name
        let coordinates = pitch.coordinates
        let address = pitch.address
        let arrayOfTypes = pitch.pitches
        let marker = L.marker(coordinates, { icon: iconObject[name.slice(0, 5)] })
        let pitch_string = ""
        for (pitchType of arrayOfTypes) {
            for (type in pitchType) {
                let number = pitchType[type]
                if (number == 1) {
                    pitch_string += type + ': ' + number + ' Pitch <br>'
                }
                else {
                    pitch_string += type + ': ' + number + ' Pitches <br>'
                }
            }

        }
        let futsalHTML = document.createElement('div')
        futsalHTML.classList.add('container')
        futsalHTML.setAttribute('align', 'center')
        let futsalButton = document.createElement('div')
        futsalButton.classList.add('container', 'd-grid', 'mx-auto', 'mt-3')
        futsalButton.innerHTML = '<button class="btn btn-outline-success"><img style="max-width: 40px" src="data/icons/directions.png">   Take me here!</button>'
        futsalButton.addEventListener('click', function () {

            controller.spliceWaypoints(0, 2)
            controller.setWaypoints([L.latLng(homeMarkerCoordinates[0], homeMarkerCoordinates[1]),
            L.latLng(coordinates[0], coordinates[1])])
            controller.addTo(map)
            getWeather(coordinates[0], coordinates[1])
            getNearby(coordinates[0], coordinates[1])

        })
        // marker.bindPopup(`<h2>${name}</h2> <h3>${address}</h3> <p>${pitch_string}</p>`)
        if (name.includes('The Arena')) {
            futsalHTML.innerHTML = `
            <div class="card" style="width: 10rem;">
            <img src="data/icons/football-icons/thearena.png" class="card-img-top p-3">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <h6 class= "card-subtitle mb-2">${address}</h6>
                <h6 class="card-text">${pitch_string}</h6>
                <a href="https://www.thearenasg.com/" class="btn btn-warning text-" target="_blank">Booking</a>
            </div>
            </div>
            `
            futsalHTML.appendChild(futsalButton)
            marker.bindPopup(futsalHTML)
            marker.addTo(theArenaClusterGroup)
        }
        if (name.includes('The Cage')) {
            futsalHTML.innerHTML = `
            <div class="card" style="width: 10rem;">
            <img src="data/icons/football-icons/thecage.png" class="card-img-top p-3">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <h6 class= "card-subtitle mb-2">${address}</h6>
                <h6 class="card-text">${pitch_string}</h6>
                <a href="https://www.thecage.com.sg/" class="btn btn-warning text-" target="_blank">Booking</a>
            </div>
            </div>
            `
            futsalHTML.appendChild(futsalButton)
            marker.bindPopup(futsalHTML)
            marker.addTo(theCageClusterGroup)
        }
        if (name.includes('Sky Park')) {
            futsalHTML.innerHTML = `
            <div class="card" style="width: 12rem;">
            <img src="data/icons/football-icons/skyparkarena.png" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <h6 class= "card-subtitle mb-2">${address}</h6>
                <h6 class="card-text">${pitch_string}</h6>
                <a href="https://www.skyparkarena.com/" class="btn btn-warning text-" target="_blank">Booking</a>
            </div>
            </div>
            `
            futsalHTML.appendChild(futsalButton)
            marker.bindPopup(futsalHTML)
            marker.addTo(skyParkClusterGroup)
        }
        if (name.includes('Uber')) {
            futsalHTML.innerHTML = `
            <div class="card" style="width: 13rem;">
            <img src="data/icons/football-icons/ubersports.png" class="card-img-top ">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <h6 class= "card-subtitle mb-2">${address}</h6>
                <h6 class="card-text">${pitch_string}</h6>
                <a href="http://www.ubersports.com.sg/" class="btn btn-warning text-" target="_blank">Booking</a>
            </div>
            </div>
            `
            futsalHTML.appendChild(futsalButton)
            marker.bindPopup(futsalHTML)
            marker.addTo(uberSportsClusterGroup)
        }
    }


    return ([theArenaLayerGroup, theCageLayerGroup, skyParkLayerGroup, uberSportsLayerGroup])

}