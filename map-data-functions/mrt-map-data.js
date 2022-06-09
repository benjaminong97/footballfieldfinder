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
    let MRTClusterGroup = L.markerClusterGroup()
    let LRTClusterGroup = L.markerClusterGroup()
    let MRTLayerGroup = L.layerGroup()
    let LRTLayerGroup = L.layerGroup()


    //var markers = L.markerClusterGroup();
// markers.addLayer(L.marker(getRandomLatLng(map)));
// ... Add more layers ...
// map.addLayer(markers);
    let MRTData = await getData('data/mrtsg.json')
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
                iconSize: [35, 40]
            })
            let marker = L.marker([lat, long], { icon: MRTicon })
    
            marker.bindPopup(`<h2>${name}, ${number}</h2>`)
            marker.addTo(LRTClusterGroup)

        }
        else {
            let MRTicon = L.icon({
                iconUrl: `data/icons/mrt-icons/Tips-icon-${MRTColorLegend[color]}.png`,
                iconSize: [60, 30]
            })
            let marker = L.marker([lat, long], { icon: MRTicon })
    
            marker.bindPopup(`<h2>${name}, ${number}</h2>`)
            marker.addTo(MRTClusterGroup)

        }
        
    }
    MRTClusterGroup.addTo(MRTLayerGroup)
    LRTClusterGroup.addTo(LRTLayerGroup)

    return ([MRTLayerGroup,LRTLayerGroup])

}

