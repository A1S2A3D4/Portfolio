let input = document.getElementById("input");
let btn = document.getElementById("search");
let h2 = document.getElementById("h2");
let ptime = document.getElementById("p-time");
let ptemC = document.getElementById("p-tempc");
let ptemF = document.getElementById("p-tempf");
let pWind = document.getElementById("p-windspeed");
let feelsliketemp = document.getElementById("p-feelsliketemp");
let weatherIcon = document.getElementById("weather-icon");
let error = document.getElementById("error");

async function getData(cityname) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=35a4624b72f64fe9bb552753241709&q=${cityname}&aqi=yes`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

function updateIcon(temperatureC) {
    if (temperatureC >= 30) {
        weatherIcon.className = "fas fa-sun";
        weatherIcon.style.color = "yellow";
    } else if (temperatureC >= 20 && temperatureC < 30) {
        weatherIcon.className = "fas fa-cloud-sun";
        weatherIcon.style.color = "orange";
    } else if (temperatureC >= 10 && temperatureC < 20) {
        weatherIcon.className = "fas fa-cloud";
        weatherIcon.style.color = "gray";
    } else {
        weatherIcon.className = "fas fa-snowflake";
        weatherIcon.style.color = "lightblue";
    }
}

btn.addEventListener("click", async () => {
    try {
        const value = input.value;
        const data = await getData(value);
        if (!data) {
            error.innerText = "No data returned from API. Please enter the correct name";
            return;
        }
        ptime.innerText = `Local Time : ${data.location.localtime}`;
        h2.innerText = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
        ptemC.innerText = `Temperature in Celsius : ${data.current.temp_c}°C`;
        feelsliketemp.innerText = `Feels Like : ${data.current.feelslike_c}°C`;
        ptemF.innerText = `Temperature in Fahrenheit : ${data.current.temp_f}°F`;
        pWind.innerText = `Wind Speed : ${data.current.wind_mph} mph`;
        
        // Update weather icon based on temperature
        updateIcon(data.current.temp_c);

        // Clear the input and forecast data after 15 seconds
        setTimeout(() => {
            input.value = "";  // Clear the input field
            h2.innerText = "";
            ptime.innerText = "";
            ptemC.innerText = "";
            feelsliketemp.innerText = "";
            ptemF.innerText = "";
            pWind.innerText = "";
            weatherIcon.className = "";  // Remove weather icon
            error.innerText = "";  // Clear any error messages
        }, 15000);
    } catch (error) {
        console.error("Error processing data:", error);
    }
});