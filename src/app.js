function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();

    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    let days = [
        "Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday", 
        "Sunday"];

    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}













function displayTemperature(response) {

    let cityElement = document.querySelector("#city");
    let dateElement = document.querySelector("#date");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let feelsLikeElement = document.querySelector("#feels-like");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");


    cityElement.innerHTML = response.data.city;
    dateElement.innerHTML = formatDate(response.data.time * 1000);
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