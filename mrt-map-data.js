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

