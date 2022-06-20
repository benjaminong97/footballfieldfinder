
// carpark availability - https://api.data.gov.sg/v1/transport/carpark-availability
async function addLayerControl() {
    //wait for everything
    let MRTLRTGroupArray = await getMRT()
    let arkGroup = await getArkGroup()
    let playSGGroup = await getPlaySGGroup()
    let carparkGroup = await getHDBCarparks()
    let otherFutsalArray = await getFutsalData()
    let busStopGroup = await getBusStopData()


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
            "Bus": busStopGroup
        },
        "Parking": {
            "HDB Carparks": carparkGroup,
        }
    };

    let layerControl = L.control.groupedLayers(baseMaps, groupedOverlays).addTo(map);

    return (layerControl)

}
let layerControl = addLayerControl()

//testing random marker
// let testMarkerHTML = document.createElement('div')
// testMarkerHTML.innerHTML = `<button class='btn btn-primary btn-sm'> hi hi hi</button>`
// let randomMarker = L.marker([1.34,103.824]).bindPopup(testMarkerHTML)
// randomMarker.addTo(map)



// var searchLayer = L.layerGroup().addTo(map);
// //... adding data in searchLayer ...
// map.addControl( new L.Control.Search({layer: searchLayer}) );
// //searchLayer is a L.LayerGroup contains searched markers

//remove controller button