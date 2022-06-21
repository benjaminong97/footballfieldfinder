//populating weather widget
async function getWeather(lat, long) {
    if (document.querySelector('#rain-div')) {
        //remove existing weather
        document.querySelector("#rain").removeChild(document.querySelector('#rain-div'))
        document.querySelector("#temp").removeChild(document.querySelector('#temp-div'))
    }


    let weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=90fb9b1b8341c3214fdc40242fa088d8`)
    let rain = weather.data.weather[0].description
    let feelsLike = weather.data.main.feels_like
    let temp = weather.data.main.temp
    let humidity = weather.data.main.humidity
    let wind = weather.data.wind.speed
    console.log(rain)
    // rain div
    let rainDiv = document.createElement('div')
    rainDiv.classList.add('card', 'd-flex', 'justify-content-center')
    rainDiv.id = 'rain-div'
    rainDiv.setAttribute('style', 'background-color: aliceblue')
    if (rain.toLowerCase().includes('sun') || rain.toLowerCase().includes('clear')) {
        rainDiv.innerHTML =
            `
        <img src="data/icons/weather-icons/sun.png" class="card-img-top p-3" style="max-height:100px; max-width: 100px">
        <div class="card-body">
          <h5 class="card-title">Sunny Weather</h5>
          <p class="card-text">Excellent weather to step outside! Remember that sunscreen if you're going outdoors!</p>
          <p class='text-muted'>Humidity: ${humidity}%</p>
          <p class= 'text-muted'>Windspeed: ${wind}m/s</p>
        </div>
        `
    }
    if (rain.toLowerCase().includes('rain') || rain.toLowerCase().includes('shower') || rain.toLowerCase().includes('thunder')) {
        rainDiv.innerHTML =
            `
        <img src="data/icons/weather-icons/raining.png" class="card-img-top p-3" style="max-height:100px; max-width: 100px">
        <div class="card-body">
          <h5 class="card-title">Rainy Weather</h5>
          <p class="card-text">Oh no, it's raining :( Please bring an umbrella if you're going out. Do check if the venue has shelter!</p>
          <p class='text-muted'>Humidity: ${humidity}%</p>
          <p class= 'text-muted'>Windspeed: ${wind}m/s</p>
        </div>
        `
    }
    if (rain.toLowerCase().includes('cloud')) {
        rainDiv.innerHTML =
            `
        <img src="data/icons/weather-icons/clouds.png" class="card-img-top p-3" style="max-height:100px; max-width: 100px">
        <div class="card-body">
          <h5 class="card-title">Cloudy Weather</h5>
          <p class="card-text">It's a bit cloudy, do be prepared for rain!</p>
          <p class='text-muted'>Humidity: ${humidity}%</p>
          <p class= 'text-muted'>Windspeed: ${wind}m/s</p>
        </div>
        `

        document.querySelector("#rain").appendChild(rainDiv)

        //temperature div
        let tempDiv = document.createElement('div')
        tempDiv.id = 'temp-div'
        tempDiv.innerHTML = `
        
    <ul class="list-group">
    <li class="list-group-item"  style="background-color:aliceblue; text-align: center"><h6>Temperature</h6></li>
    <li class="list-group-item"  style="background-color:aliceblue"><h6>Feels Like:</h6><h1>${feelsLike}°C</h1></li>
    <li class="list-group-item"  style="background-color:aliceblue"><h6>Actual:</h6><h1>${temp}°C</h1></li>
    </ul>
    `
        document.querySelector('#temp').appendChild(tempDiv)
    }
}