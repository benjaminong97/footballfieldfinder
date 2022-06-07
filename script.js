
//get data from theark.json
async function getArkGroup() {
    let arkGroup = L.layerGroup()
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
        marker.addTo(arkGroup)
    }




    let carparkData = await getData('https://api.data.gov.sg/v1/transport/carpark-availability')
    console.log(carparkData)

    return (arkGroup)
}


// carpark availability - https://api.data.gov.sg/v1/transport/carpark-availability

//adding the MRT
async function getMRT() {
    let MRTColorLegend = {
        'GREEN': 'EW',
        'RED': 'NS',
        'YELLOW': 'CC',
        'PURPLE': 'NE',
        'BLUE': 'DT',
        'OTHERS': 'LRT',
    }
    let MRTGroup = L.layerGroup()
    let LRTGroup = L.layerGroup()


    //var markers = L.markerClusterGroup();
// markers.addLayer(L.marker(getRandomLatLng(map)));
// ... Add more layers ...
// map.addLayer(markers);
    let response = await axios.get('data/mrtsg.json')
    let MRTData = response.data
    for (station of MRTData) {
        let name = station.STN_NAME
        let lat = station.Latitude
        let long = station.Longitude
        let color = station.COLOR
        let number = station.STN_NO

        //custom mrt/lrt icons
        if (station.COLOR == "OTHERS"){
            let MRTicon = L.icon({
                iconUrl: `data/icons/mrt-icons/Tips-icon-${MRTColorLegend[color]}.png`,
                iconSize: [60, 22]
            })
            let marker = L.marker([lat, long], { icon: MRTicon })
    
            marker.bindPopup(`<h2>${name}, ${number}</h2>`)
            marker.addTo(LRTGroup)

        }
        else {
            let MRTicon = L.icon({
                iconUrl: `data/icons/mrt-icons/Tips-icon-${MRTColorLegend[color]}.png`,
                iconSize: [60, 30]
            })
            let marker = L.marker([lat, long], { icon: MRTicon })
    
            marker.bindPopup(`<h2>${name}, ${number}</h2>`)
            marker.addTo(MRTGroup)

        }
        
    }

    return ([MRTGroup,LRTGroup])

}




async function addLayerControl() {
    //wait for everything
    let MRTLRTGroupArray = await getMRT()
    let arkGroup = await getArkGroup()
    let playSGGroup = await getPlaySGGroup()


    //adding layer control
    let baseMaps = {
        "playSG": playSGGroup,
        "arkSG": arkGroup,
    };


    let overlayMaps = {
        "MRT": MRTLRTGroupArray[0],
        "LRT": MRTLRTGroupArray[1],
    };

    let layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
    return(layerControl)
}
let layerControl = addLayerControl()
