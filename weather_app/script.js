const API_KEY = '5eaa1e092283f06267c40a62ef7db419';

// DOM elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const weatherIcon = document.getElementById('weather-icon');
const weatherDesc = document.getElementById('weather-desc');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');

// Current date
const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
dateElement.textContent = today.toLocaleDateString('en-US', options);

// Fetch weather data
async function getWeatherData(city) {
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.cod !== 200) {
            throw new Error(data.message || 'Unknown error');
        }
        
        displayWeatherData(data);
    } catch (error) {
        console.error('Failed to fetch weather:', error);
        alert(`Could not get weather data: ${error.message}`);
    }
}

// Display weather data
function displayWeatherData(data) {
    cityName.textContent = data.name + ', ' + data.sys.country;
    tempElement.textContent = Math.round(data.main.temp);
    weatherDesc.textContent = data.weather[0].description;
    humidityElement.textContent = data.main.humidity;
    windElement.textContent = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h
    
    // Weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].main;
}

// Event listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        alert('Please enter a city name');
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherData(city);
        } else {
            alert('Please enter a city name');
        }
    }
});

// Default city on load
getWeatherData('Oujda');