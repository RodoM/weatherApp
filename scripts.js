const setCity = document.getElementById('current-city');
const setTime = document.getElementById('current-time');
const map = document.getElementById('map'); 
const temperatureItems = document.getElementById('temperature');
const extraItems = document.getElementById('extra');
const week = document.getElementById('week')

const API_KEY = 'f533041b7225141cdd264f7386aac2d8';

const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
const days2 = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
}

function getWeekDay(i) {
    if (i > 6) {i = i - 7}
    return i;
}

setInterval(() => {
    const time = new Date();
    setTime.innerHTML = days[time.getDay()] + ' ' + time.getDate() + ' ' + months[time.getMonth()] + ' - ' + addZero(time.getHours()) + ':' + addZero(time.getMinutes());
}, 1000);

function searchCity() {
    var cityName = document.getElementById('city-name').value;
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}`)
    .then(res => res.json().then(data => {
        setCity.innerHTML = `${data[0].name}, ${data[0].state} ${data[0].country}`;
        getWeatherData(data[0].lat, data[0].lon);
    }))
}

function getWeatherData(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
    .then(res => res.json().then(data => {
        showWeatherData(data);
    }))
}

function showWeatherData(data) {
    let {sunrise, sunset, feels_like, temp, pressure, humidity, wind_speed, weather} = data.current;

    temperatureItems.innerHTML = 
    `
    <img src="https://openweathermap.org/img/wn//${weather[0].icon}@4x.png" alt="weather icon" class="icon">
    <div class="degrees" id="current-degrees">${Math.floor(temp)}°C</div>
    <div class="weather-extra">
        <div class="thermal-sens" id="current-sens">${weather[0].main}</div>
        <div class="weather" id="current-weather">Sensasión térmica ${Math.floor(feels_like)}°C</div>
    </div>
    `;


    let sunrise_date = new Date(sunrise * 1000);
    let sunset_date = new Date(sunset * 1000);

    extraItems.innerHTML = 
    `
    <div class="wind" id="current-wind"><h4>Viento</h4>${wind_speed}m/s</div>
    <div class="humidity" id="current-humidity"><h4>Humedad</h4>${humidity}%</div>
    <div class="preassure" id="current-preassure"><h4>Presión</h4>${pressure} mbar</div>
    <div class="sunrise" id="current-sunrise"><h4>Amanecer</h4>${addZero(sunrise_date.getHours()) + ":" + addZero(sunrise_date.getMinutes())}</div>
    <div class="sunset" id="current-sunset"><h4>Anochecer</h4>${sunset_date.getHours() + ":" + sunset_date.getMinutes()}</div>
    `;

    const time = new Date();
    

    week.innerHTML =
    `
    <div class="main-card" id="main-card">
            <div class="day">Hoy</div>
            <div class="content">
                <img src="https://openweathermap.org/img/wn//${data.daily[0].weather[0].icon}@4x.png" alt="weather icon" class="card-icon">
                <div class="max-min">
                    <div class="max">Máx ${Math.floor(data.daily[0].temp.max)}°C</div>
                    <div class="min">Mín ${Math.floor(data.daily[0].temp.min)}°C</div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="day">${days2[getWeekDay(time.getDay() + 1)] + ' ' + (time.getDate() + 1)}</div>
            <div class="content">
            <img src="https://openweathermap.org/img/wn//${data.daily[1].weather[0].icon}@4x.png" alt="weather icon" class="card-icon">
                <div class="max-min">
                <div class="max">Máx ${Math.floor(data.daily[1].temp.max)}°C</div>
                <div class="min">Mín ${Math.floor(data.daily[1].temp.min)}°C</div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="day"ay3">${days2[getWeekDay(time.getDay() + 2)] + ' ' + (time.getDate() + 2)}</div>
            <div class="content">
            <img src="https://openweathermap.org/img/wn//${data.daily[2].weather[0].icon}@4x.png" alt="weather icon" class="card-icon">
                <div class="max-min">
                <div class="max">Máx ${Math.floor(data.daily[2].temp.max)}°C</div>
                <div class="min">Mín ${Math.floor(data.daily[2].temp.min)}°C</div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="day"ay4">${days2[getWeekDay(time.getDay() + 3)] + ' ' + (time.getDate() + 3)}</div>
            <div class="content">
            <img src="https://openweathermap.org/img/wn//${data.daily[3].weather[0].icon}@4x.png" alt="weather icon" class="card-icon">
                <div class="max-min">
                <div class="max">Máx ${Math.floor(data.daily[3].temp.max)}°C</div>
                <div class="min">Mín ${Math.floor(data.daily[3].temp.min)}°C</div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="day"ay5">${days2[getWeekDay(time.getDay() + 4)] + ' ' + (time.getDate() + 4)}</div>
            <div class="content">
            <img src="https://openweathermap.org/img/wn//${data.daily[4].weather[0].icon}@4x.png" alt="weather icon" class="card-icon">
                <div class="max-min">
                <div class="max">Máx ${Math.floor(data.daily[4].temp.max)}°C</div>
                <div class="min">Mín ${Math.floor(data.daily[4].temp.min)}°C</div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="day"ay6">${days2[getWeekDay(time.getDay() + 5)] + ' ' + (time.getDate() + 5)}</div>
            <div class="content">
            <img src="https://openweathermap.org/img/wn//${data.daily[5].weather[0].icon}@4x.png" alt="weather icon" class="card-icon">
                <div class="max-min">
                <div class="max">Máx ${Math.floor(data.daily[5].temp.max)}°C</div>
                <div class="min">Mín ${Math.floor(data.daily[5].temp.min)}°C</div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="day"ay7">${days2[getWeekDay(time.getDay() + 6)] + ' ' + (time.getDate() + 6)}</div>
            <div class="content">
            <img src="https://openweathermap.org/img/wn//${data.daily[6].weather[0].icon}@4x.png" alt="weather icon" class="card-icon">
                <div class="max-min">
                <div class="max">Máx ${Math.floor(data.daily[6].temp.max)}°C</div>
                <div class="min">Mín ${Math.floor(data.daily[6].temp.min)}°C</div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="day"ay7">${days2[getWeekDay(time.getDay() + 7)] + ' ' + (time.getDate() + 7)}</div>
            <div class="content">
            <img src="https://openweathermap.org/img/wn//${data.daily[7].weather[0].icon}@4x.png" alt="weather icon" class="card-icon">
                <div class="max-min">
                <div class="max">Máx ${Math.floor(data.daily[7].temp.max)}°C</div>
                <div class="min">Mín ${Math.floor(data.daily[7].temp.min)}°C</div>
                </div>
            </div>
        </div>
    `;
}