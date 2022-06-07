//this has NOT BEEN FIXED --> ask TA when they are in --> if no way to read in http on https, download the static data separately
//getting bus stop data from LTA
window.addEventListener('DOMContentLoaded', async function(){
    let busStopData = await axios.get("http://datamall2.mytransport.sg/ltaodataservice/BusStops", {headers: {
        "AccountKey" : 'mlBIQv40QcG5tTgF+w8NKg=='
    }})
    console.log(busStopData)
})

async function getData(filepath, object){
    let response = await axios.get(filepath, object);
    return (response.data)
}


// const LTA_API_KEY = 'mlBIQv40QcG5tTgF+w8NKg=='

// let busStopPath = "http://datamall2.mytransport.sg/ltaodataservice/BusStops"

// let header = {
//     "AccountKey" : 'mlBIQv40QcG5tTgF+w8NKg=='
// }
