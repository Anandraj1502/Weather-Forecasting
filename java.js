async function searchWeather() {
    const apiKey = "2b3870e34cf76140c441b1aa9be6988f";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    const location = document.getElementById('location-input').value;
    
    if (!location) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
    const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5&aqi=no&alerts=no`;

    try {
        const [currentWeatherResponse, forecastResponse] = await Promise.all([
            fetch(currentWeatherUrl),
            fetch(forecastUrl)
        ]);

        if (!currentWeatherResponse.ok || !forecastResponse.ok) {
            throw new Error('City not found');
        }

        const currentWeatherData = await currentWeatherResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentWeatherData);
        displayForecast(forecastData);

    } catch (error) {
        alert(error.message);
    }
}

function displayCurrentWeather(data) {
    document.getElementById('humidity').textContent = data.current.humidity;
    document.getElementById('temperature').textContent = data.current.temp_c;
    document.getElementById('weather-description').textContent = data.current.condition.text;
    document.getElementById('wind-speed').textContent = data.current.wind_kph;
}

function displayForecast(data) {
    const forecastList = document.getElementById('forecast-list');
    forecastList.innerHTML = '';

    data.forecast.forecastday.forEach(forecast => {
        const listItem = document.createElement('li');
        const date = new Date(forecast.date).toLocaleDateString();
        const temp = forecast.day.avgtemp_c;
        const description = forecast.day.condition.text;
        
        listItem.innerHTML = `
            <h3>${date}</h3>
            <p>Temperature: ${temp}°C</p>
            <p>Weather: ${description}</p>
        `;
        forecastList.appendChild(listItem);
    });
}
