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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];

}

function displayForecast(response) {
  
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");
  
    
  
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
          <img
            src= ${forecastDay.condition.icon_url}
            alt="icon"
            width="42"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temperature.maximum)}° </span>
            <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temperature.minimum)}° </span>
          </div>
        </div>
    `;}
    });
  
  
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    console.log(forecastHTML);
  }

function getForcast(coordinates) {
  
  console.log(coordinates);
  let apiKey = "tce447e9aac51b35b06befo3864f3df5";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);

}


function displayTemperature(response) {


    let cityElement = document.querySelector("#city");
    let dateElement = document.querySelector("#date");
    let temperatureElement = document.querySelector("#temperature");
    let iconElement = document.querySelector("#icon");
    let descriptionElement = document.querySelector("#description");
    let feelsLikeElement = document.querySelector("#feels-like");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");


    fahrenheitTemperature = response.data.temperature.current;

    cityElement.innerHTML = response.data.city;
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    iconElement.setAttribute("src", response.data.condition.icon_url);
    iconElement.setAttribute("alt",  response.data.condition.description);
    descriptionElement.innerHTML = response.data.condition.description;
    feelsLikeElement.innerHTML = Math.round(response.data.temperature.feels_like);
    humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
    windElement.innerHTML = Math.round(response.data.wind.speed);

    getForcast(response.data.coordinates);
}

function search(city) {
    let apiKey = "tce447e9aac51b35b06befo3864f3df5";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayTemperature);
    
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
    
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let celsiusTemperature = (fahrenheitTemperature - 32) * 5/9;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    temperatureElement = document.querySelector("#temperature");
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}


let fahrenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature)

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);


search("Boston");
