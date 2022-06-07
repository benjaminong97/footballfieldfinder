


// carpark availability - https://api.data.gov.sg/v1/transport/carpark-availability




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
