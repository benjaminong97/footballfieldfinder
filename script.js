
// carpark availability - https://api.data.gov.sg/v1/transport/carpark-availability
async function addLayerControl() {
    //wait for everything
    let MRTLRTGroupArray = await getMRT()
    let arkGroup = await getArkGroup()
    let playSGGroup = await getPlaySGGroup()
    let carparkGroup = await getHDBCarparks()
    let otherFutsalArray = await getFutsalData()

    //adding layer control
    let baseMaps = {

    };


    let groupedOverlays = {
        "General Sports Facilties": {
            "ActiveSG": playSGGroup,
        },
        "Football/ Futsal": {

            "arkSG": arkGroup,
            "The Arena": otherFutsalArray[0],
            "The Cage": otherFutsalArray[1],
            "Sky Park": otherFutsalArray[2],
            "Uber Sports": otherFutsalArray[3],
        },
        "Transport": {
            "MRT": MRTLRTGroupArray[0],
            "LRT": MRTLRTGroupArray[1],
        },
        "Parking": {
            "HDB Carparks": carparkGroup,
        }
    };

    let layerControl = L.control.groupedLayers(baseMaps, groupedOverlays).addTo(map);
    return (layerControl)

    map.addLayer(clusterGroup)
}
let layerControl = addLayerControl()

