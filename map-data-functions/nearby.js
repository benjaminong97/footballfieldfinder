async function getNearby(lat, long) {
    //remove previous nearby data if already existing
    if (document.querySelector('#nearby-div')) {
        document.querySelector('#nearby').removeChild(document.querySelector('#nearby-div'))
    }

    //foursquare api requirements
    let options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'fsq3hqbM80c9k3H8/4rx66nI5KjMGSj25pHRnp3e1W/R0ho='
        }
      };

    //instantiate variables for nearest mrt station
    let nameMRT = "Not Found, Distance Too Far"
    let coordinatesMRTLat = []
    let coordinatesMRTLong = []
    let distanceToMRT = 0.00

    //get nearest mrt station data
    let nearbyMRT = await axios.get(`https://api.foursquare.com/v3/places/search?query=mrt%20station&ll=${lat}%2C${long}`, options)
    
    if (!(nearbyMRT.data.results.length == 0)) {
        
        nameMRT = nearbyMRT.data.results[0].name
        coordinatesMRTLat = nearbyMRT.data.results[0].geocodes.main.latitude
        coordinatesMRTLong = nearbyMRT.data.results[0].geocodes.main.longitude
        distanceToMRT = getDistanceFromLatLonInKm(lat, long, coordinatesMRTLat, coordinatesMRTLong)
    }

    //instantiate variables for nearest carpark
    let nameCarpark = "Not Found, Distance Too Far"
    let coordinatesCarparkLat = []
    let coordinatesCarparkLong = []
    let distanceToCarpark = 0.00

    // get nearest carpark data
    let nearbyCarpark = await axios.get(`https://api.foursquare.com/v3/places/search?query=carpark&ll=${lat}%2C${long}`, options)
    if (!(nearbyCarpark.data.results.length == 0)) {
        
        nameCarpark = nearbyCarpark.data.results[0].name
        locationCarpark = nearbyCarpark.data.results[0].location.address
        postcodeCarpark = nearbyCarpark.data.results[0].location.postcode
        coordinatesCarparkLat = nearbyCarpark.data.results[0].geocodes.main.latitude
        coordinatesCarparkLong = nearbyCarpark.data.results[0].geocodes.main.longitude
        distanceToCarpark = getDistanceFromLatLonInKm(lat, long, coordinatesCarparkLat, coordinatesCarparkLong)
    }
   
    //instantiate variables for nearest bus stop
    let nameBusstop = "Not Found, Distance Too Far"
    let coordinatesBusstopLat = []
    let coordinatesBusstopLong = []
    let distanceToBusstop = 0.00
    let locationBusstop = ""

    let nearbyBusstop = await axios.get(`https://api.foursquare.com/v3/places/search?query=bus%20stop&ll=${lat}%2C${long}`, options)
    //get nearest busstop data
    if (!(nearbyBusstop.data.results.length == 0)) {
        
        nameBusstop = nearbyBusstop.data.results[0].name
        locationBusstop = nearbyBusstop.data.results[0].location.address
        coordinatesBusstopLat = nearbyBusstop.data.results[0].geocodes.main.latitude
        coordinatesBusstopLong = nearbyBusstop.data.results[0].geocodes.main.longitude
        distanceToBusstop = getDistanceFromLatLonInKm(lat, long, coordinatesBusstopLat, coordinatesBusstopLong)
    }

    //instantiate variables for nearest supermarket
    let nameSupermarket = "Not Found,"
    let coordinatesSupermarketLat = []
    let coordinatesSupermarketLong = []
    let distanceToSupermarket = 0.00
    let locationSupermarket = "Distance Too Far"
    let postcodeSupermarket = ""

    let nearbySupermarket = await axios.get(`https://api.foursquare.com/v3/places/search?query=supermarket&ll=${lat}%2C${long}`, options)
    //get nearest supermarket data
    if (!(nearbySupermarket.data.results.length == 0)) {
        
        nameSupermarket = nearbySupermarket.data.results[0].name
        locationSupermarket = nearbySupermarket.data.results[0].location.address
        postcodeSupermarket = nearbySupermarket.data.results[0].location.postcode
        coordinatesSupermarketLat = nearbySupermarket.data.results[0].geocodes.main.latitude
        coordinatesSupermarketLong = nearbySupermarket.data.results[0].geocodes.main.longitude
        distanceToSupermarket = getDistanceFromLatLonInKm(lat, long, coordinatesSupermarketLat, coordinatesSupermarketLong)
    }

    //create new div and add data we have pulled
    let nearbyDiv = document.createElement('div')
    nearbyDiv.id="nearby-div"
    nearbyDiv.innerHTML = `
    <ul class="list-group" >
        <li class="list-group-item d-flex"><h5>Distances to nearby places:</h5></li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto d-flex"> <img width="40" src="data/icons/mrtgenlogo.png">
            <div class="ms-2"><div class="fw-bold">${nameMRT}</div>
            ${distanceToMRT.toFixed(2)}km</div>
            
            </div>
   
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto d-flex align-items-center"> <img width="40" height="40" height="auto" src="data/icons/hdb-carpark.png">
            <div class="ms-2">
            <div class="fw-bold">${nameCarpark}, ${locationCarpark}, S(${postcodeCarpark})</div>
            ${distanceToCarpark.toFixed(2)}km</div>
            </div>

        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto d-flex"><img width="45" src="data/icons/busicon.png">
            <div class="ms-">
            <div class="fw-bold">${nameBusstop}</div>
            ${distanceToBusstop.toFixed(2)}km</div>
            </div>

        </li>
        <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto d-flex"> <img width="40" height:"40" src="data/icons/shopping.png">
            <div class="ms-2">
            <div class="fw-bold">${nameSupermarket}, ${locationSupermarket}, S(${postcodeSupermarket})</div>
            ${distanceToSupermarket.toFixed(2)}km</div>
            </div>

        </li>
    </ul>
    `

    //add new div to document
    document.querySelector('#nearby').appendChild(nearbyDiv)

}