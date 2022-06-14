
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

// L.Routing.control({
//     waypoints: [
//       L.latLng(1.34, 103.824),
//       L.latLng(1.341, 103.800)
//     ],
//     router: L.Routing.mapbox('pk.eyJ1IjoiaGV5aXRzYm9uZyIsImEiOiJjbDQ1OGh3ZGYwMnBrM2RtcHowNzExb2x6In0.nYmo8E72bvcLOppTOiuwpw')
//   }).addTo(map);


// var searchLayer = L.layerGroup().addTo(map);
// //... adding data in searchLayer ...
// map.addControl( new L.Control.Search({layer: searchLayer}) );
// //searchLayer is a L.LayerGroup contains searched markers