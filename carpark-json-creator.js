// using foursquare to get all carpark coordinates is extremely slow, since carparks don't change too often, creating json file 
async function getCarparks() {
    let carparkData = await getData('data/hdb-carpark-information.json')
    let carparkArray = []
    for (carpark of carparkData) {
        let carparkAddress = carpark.address
        console.log(carparkAddress)
        //convert address to lat long so that they can be placed as markers on the map
        // four square is a bit slow, trying using mapbox
        //replacing spaces with %20, in accordance to their query string
        let response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${carparkAddress.replace(/ /g, "%20")}.json?country=sg&limit=1&access_token=pk.eyJ1IjoiaGV5aXRzYm9uZyIsImEiOiJjbDNzY3Awb20xaHByM2lrY3k3dXkyYzY4In0.WpE8u5nGJfX_qlSsrRBO4w`)
        console.log(response.data)
        if (response.data.features[0] != undefined) {
            let lat = response.data.features[0].geometry.coordinates[1]
            let long = response.data.features[0].geometry.coordinates[0]
            let object = {
                "address": carparkAddress,
                "latitude": lat,
                "longitude": long
            }
            carparkArray.push(object)
        }

    }
    console.log(carparkArray)
}
//getCarparks()
//DATA HAS ALREADY BEEN STORED IN hdb-carpark.json, DO NOT RUN THIS FUNCTION