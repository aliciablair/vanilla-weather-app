function displayTemperature(response) {

    console.log(response.data);
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");

    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    descriptionElement.innerHTML = response.data.condition.description;
}

let apiKey = "tce447e9aac51b35b06befo3864f3df5";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Boston&key=${apiKey}&units=imperial`;


console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);