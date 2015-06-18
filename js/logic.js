function checkTime(i) {
    "use strict";
    if (i<10) {
        i = "0" + i;
    }
    return i;
}

function startTime() {
    "use strict";
    var today = new Date(),
        h = today.getHours(),
        m = today.getMinutes(),
        t;
    m = checkTime(m);
    document.getElementById('clock').innerHTML = h + ":" + m;
    t = setTimeout(function(){startTime();},1000);
}

function days() {
    "use strict";
    var d = new Date(),
        weekday = new Array(7),
        weekdays = [];


    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    weekdays[0] = weekday[d.getDay()];
    weekdays[1] = weekday[d.getDay() + 1];
    weekdays[2] = weekday[d.getDay() + 2];
    weekdays[3] = weekday[d.getDay() + 3];

    return weekdays;
}

function parseWeather() {
    //Todo: Icons, forecast
    "use strict";
    if (this.readyState === 4) {
        if (this.status === 200) {
            var weekdays = days();
            var weather = JSON.parse(this.responseText);
            if (this.custom_forecast) {
                var td_days = document.getElementById('weather_forecast_days').getElementsByTagName("td"),
                    td_icons = document.getElementById('weather_forecast_icons').getElementsByTagName("td"),
                    td_maxs = document.getElementById('weather_forecast_maxs').getElementsByTagName("td"),
                    td_mins = document.getElementById('weather_forecast_mins').getElementsByTagName("td");

                td_days[0].textContent = weekdays[1];
                td_days[1].textContent = weekdays[2];
                td_days[2].textContent = weekdays[3];

                td_icons[0].innerHTML = '<i class="wi wi-' + weather.list[0].weather[0].icon + '"></i>';
                td_icons[1].innerHTML = '<i class="wi wi-' + weather.list[0].weather[0].icon + '"></i>';
                td_icons[2].innerHTML = '<i class="wi wi-' + weather.list[0].weather[0].icon + '"></i>';

                td_maxs[0].textContent = Math.round(weather.list[0].temp.max) + "°C";
                td_maxs[1].textContent = Math.round(weather.list[1].temp.max) + "°C";
                td_maxs[2].textContent = Math.round(weather.list[2].temp.max) + "°C";

                td_mins[0].textContent = Math.round(weather.list[0].temp.min) + "°C";
                td_mins[1].textContent = Math.round(weather.list[1].temp.min) + "°C";
                td_mins[2].textContent = Math.round(weather.list[2].temp.min) + "°C";

                console.log("forecast");
                console.log(weather);
            } else {
                document.getElementById('weather_town').textContent = weather.name;
                document.getElementById('weather_current_temperature').textContent = Math.round(weather.main.temp) + "°C";
                document.getElementById('weather_current_text').textContent = weather.weather[0].description;
                document.getElementById('weather_current_day').textContent = weekdays[0];

                document.getElementById('weather_current_icon').innerHTML = '<i class="wi wi-' + weather.weather[0].icon + '"></i>';

                console.log("daily");
                console.log(weather);
            }

        }
    }
}

function getWeather(url, lat, lon, forecast) {
    "use strict";
    /*
     * !Get it, fill it
     * http://api.openweathermap.org/data/2.5/weather?mode=json&units=metric&lang=en&id=2838534
     * http://api.openweathermap.org/data/2.5/forecast/daily?cnt=3&mode=json&units=metric&lang=en&id=2838534
     *
     */

    var httpRequest = new XMLHttpRequest();

    httpRequest.custom_forecast = forecast;
    httpRequest.onload = parseWeather;
    httpRequest.open('GET', url);
    httpRequest.send();
}

function getLocation() {
    "use strict";

    if (!navigator.geolocation) {
        return;
    }

   function success(position) {
        var latitude  = position.coords.latitude,
            longitude = position.coords.longitude;

        return latitude,longitude;
        console.log(latitude);
    }

    function error() {
        console.log("Unable to retrieve your location");
    }
    navigator.geolocation.getCurrentPosition(success,error);
}

getLocation();
startTime();
getWeather("http://api.openweathermap.org/data/2.5/weather?mode=json&units=metric&lang=en&id=2838534", false);
getWeather("http://api.openweathermap.org/data/2.5/forecast/daily?cnt=3&mode=json&units=metric&lang=en&id=2838534", true);
