// function to get data from JSON files/ API
async function getData(filepath, object){
    let response = await axios.get(filepath, object);
    return (response.data)
}



