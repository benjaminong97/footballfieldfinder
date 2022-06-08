async function getCarparks(){
    let carparkData = await getData('data/hdb-carpark-information.json')
    for (carpark of carparkData) {
        let carparkAddress = carpark.address
        //convert address to lat long so that they can be placed as markers on the map
        //using foursquare API to do so
    }
}
let carparkData = getCarparks()