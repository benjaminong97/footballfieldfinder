async function getFutsalData(){
    let futsalData = await axios.get('data/other-futsal-pitches.json')
    let arrayOfPitches = futsalData.data.pitches
    let theArenaIcon = L.icon({
        iconUrl: 'data/icons/football-icons/thearena.png',
        iconSize: [80,30]
    })
    let theCageIcon = L.icon({
        iconUrl: 'data/icons/football-icons/thecage.png',
        iconSize: [100,50]
    })
    let skyParkIcon = L.icon({
        iconUrl: 'data/icons/football-icons/skyparkarena.png',
        iconSize: [120,100]
    })
    let uberSportsIcon = L.icon({
        iconUrl: 'data/icons/football-icons/ubersports.png',
        iconSize: [135,50]
    })
    let iconObject = {
        'The C' : theCageIcon,
        'The A' : theArenaIcon,
        'Sky P' : skyParkIcon,
        'Uber ' : uberSportsIcon
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
    for (pitch of arrayOfPitches){
        let name = pitch.name
        let coordinates = pitch.coordinates
        let address = pitch.address
        let arrayOfTypes = pitch.pitches
        let marker = L.marker(coordinates, {icon: iconObject[name.slice(0,5)]})
        let pitch_string = ""
        for (pitchType of arrayOfTypes){
            for (type in pitchType) {
                let number = pitchType[type]
                if (number == 1) {
                    pitch_string += type + ': ' + number + ' Pitch <br>'
                }
                else{
                    pitch_string += type + ': ' + number + ' Pitches <br>'
                }
            }
            
        }
        marker.bindPopup(`<h2>${name}</h2> <h3>${address}</h3> <p>${pitch_string}</p>`)
        if (name.includes('The Arena')) {
            marker.addTo(theArenaClusterGroup)
        }
        if(name.includes('The Cage')) {
            marker.addTo(theCageClusterGroup)
        }
        if(name.includes('Sky Park')) {
            marker.addTo(skyParkClusterGroup)
        }
        if(name.includes('Uber')){
            marker.addTo(uberSportsClusterGroup)
        }
        }

        
    return([theArenaLayerGroup, theCageLayerGroup, skyParkLayerGroup, uberSportsLayerGroup])
    
}