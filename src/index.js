let now = new Date();
function changeDate(date) {
  let currentDate = document.querySelector("#date");
  currentDate.innerHTML = `${day} ${hour}:${minute}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();

changeDate();

function input() {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let currentCity = searchInput.value;
  let city = document.querySelector("#input-city");
  city.innerHTML = `${currentCity}`;
  let apiKey = "c7f32a2fb5e751a7cff2fe2f63631217";
  let unit = "metric";
  let cityLink = currentCity;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityLink}&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(showTemperature);
}

function showTemperature(response) {
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let temperature = Math.round(response.data.main.temp);
  let tempr = document.querySelector("#current-temperature");
  tempr.innerHTML = `${temperature}°`;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

let form = document.querySelector("form");
form.addEventListener("submit", input);

function showLocation(position) {
  let latitude = Math.round(position.coords.latitude);
  let longitude = Math.round(position.coords.longitude);
  let apiKey = "c7f32a2fb5e751a7cff2fe2f63631217";
  let unit = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(showNewTemp);
  alert(
    `Your current location coordinates are: ${latitude}° of latitude and ${longitude}° of longitude.`
  );
}
function getLocation() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

function showNewTemp(response) {
  console.log();
  let temperature = Math.round(response.data.main.temp);
  alert(`The temperature outside is ${temperature}°C.`);
}

let button = document.querySelector("button");
button.addEventListener("click", getLocation, showNewTemp);

function convertCel() {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");
  let celTemp = 25;
  temperature.innerHTML = `${celTemp}°`;
}
function convertFahr() {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");
  let celTemp = 25;
  let fahrTemp = Math.round((celTemp * 9) / 5 + 32);
  temperature.innerHTML = `${fahrTemp}°`;
}

let c = document.querySelector("#cel");
let f = document.querySelector("#fahr");

c.addEventListener("click", convertCel);
f.addEventListener("click", convertFahr);
