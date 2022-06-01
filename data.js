// function to get data from JSON files/ API
async function getData(filePath){
    let response = await axios.get(filePath);
    return(response.data)
}

