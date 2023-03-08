function displayTemperature(response) {

    console.log(response.data);
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let feelsLikeElement = document.querySelector("#feels-like");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");


    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    descriptionElement.innerHTML = response.data.condition.description;
    feelsLikeElement.innerHTML = Math.round(response.data.temperature.feels_like);
    humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
    windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "tce447e9aac51b35b06befo3864f3df5";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Boston&key=${apiKey}&units=imperial`;


console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);