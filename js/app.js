// === api ===
const api = {
    key: '1c06c22300cc0c84a3f04bb5a324193e',
    base: 'https://api.openweathermap.org/data/2.5/'
};

// === Variables ===
let city = document.querySelector('.city');
let temp = document.querySelector('.temp');
let weather_el = document.querySelector('.weather');
let hi_low = document.querySelector('.hi-low');


// === Day ===
let now = new Date();
let date = document.querySelector('.date');


date.innerText = dateBuilder(now);

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}


// === Your location's weather ===
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
} else {
    alert('Geolocation is not supported by your browser, please search your city');
}

function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResult);

}

function error() {
    alert('Unable to retrieve your location or search your city');
}

// === Search ===
const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuerry);

function setQuerry(evt) {
    if (evt.keyCode == 13) {
        getResults(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResult);
}

function displayResult(weather) {
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    weather_el.innerText = weather.weather[0].main;

    hi_low.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}
