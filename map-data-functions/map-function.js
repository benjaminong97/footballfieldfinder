//function to initialise and return the map
function createMap(){
    let singapore = [1.3459183770684942, 103.81127337437334]; // #1 Singapore latlng
    let map = L.map('map', {
        maxBounds: L.latLngBounds(L.latLng(1.17582414422676, 103.55028733792145), L.latLng(1.5143310798340939, 104.08361204997786))
    }).setView(singapore, 13); // #2 Set the center point

    // setup the tile layers
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    minZoom: 12,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
    }).addTo(map);
    return(map)
}

// initialise map
let map = createMap();

//initialise routing machine
let controller = L.Routing.control({
    position: 'topleft',
    addWaypoints: false,
    router: L.Routing.mapbox('pk.eyJ1IjoiaGV5aXRzYm9uZyIsImEiOiJjbDQ1OGh3ZGYwMnBrM2RtcHowNzExb2x6In0.nYmo8E72bvcLOppTOiuwpw'),
    createMarker: function() { return null; },
})



