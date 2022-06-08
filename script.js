


// carpark availability - https://api.data.gov.sg/v1/transport/carpark-availability


async function addLayerControl() {
    //wait for everything
    let MRTLRTGroupArray = await getMRT()
    let arkGroup = await getArkGroup()
    let playSGGroup = await getPlaySGGroup()
    let carparkGroup = await getHDBCarparks()


    //adding layer control
    let baseMaps = {
        "playSG": playSGGroup,
        "arkSG": arkGroup,
    };


    let overlayMaps = {
        "MRT": MRTLRTGroupArray[0],
        "LRT": MRTLRTGroupArray[1],
        "HDB Carparks": carparkGroup,
    };

    let layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
    return(layerControl)
    
    map.addLayer(clusterGroup)
}
let layerControl = addLayerControl()

