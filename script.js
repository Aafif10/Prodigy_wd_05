let button = document.getElementById("searchBtn");
let result = document.getElementById("result");

button.addEventListener("click", getWeather);

async function getWeather() {

    let cityName = document.getElementById("city").value.trim();

    if (cityName === "") {
        result.innerHTML = "Please enter city name";
        return;
    }

    result.innerHTML = "Loading...";

    try {

        // Step 1: Get Latitude & Longitude
        let geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
        );

        let geoData = await geoResponse.json();

        if (!geoData.results) {
            result.innerHTML = "City not found";
            return;
        }

        let lat = geoData.results[0].latitude;
        let lon = geoData.results[0].longitude;

        // Step 2: Get Weather using coordinates
        let weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );

        let weatherData = await weatherResponse.json();

        let temp = weatherData.current_weather.temperature;
        let wind = weatherData.current_weather.windspeed;

        result.innerHTML = `
            <p><strong>City:</strong> ${cityName}</p>
            <p><strong>Temperature:</strong> ${temp} °C</p>
            <p><strong>Wind Speed:</strong> ${wind} km/h</p>
        `;

    } catch (error) {
        result.innerHTML = "Something went wrong!";
        console.log(error);
    }
}
