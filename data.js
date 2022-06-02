// function to get data from JSON files/ API
async function getData(filePath){
    let response = await axios.get(filePath);
    return(response.data)
}

const LTA_API_KEY = 'mlBIQv40QcG5tTgF+w8NKg=='

let header = {
    "AccountKey" : "http://datamall2.mytransport.sg/ltaodataservice/BusStops"
}

