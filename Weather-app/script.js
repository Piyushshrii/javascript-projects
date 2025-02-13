async function fetchWeatherData(city) {
    const API_KEY = "104f5799cdb9aa6f8cf921f45bae1e27"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}

function displayWeatherData(data) {
    const { name, main, weather } = data;

    document.getElementById("city-name").textContent = name;
    document.getElementById("temperature").textContent = `Temperature: ${main.temp_max}°C`;
    document.getElementById("description").textContent = `Weather: ${weather[0].description}`;

    document.getElementById("weather-info").classList.remove("hidden");
    document.getElementById("error-message").classList.add("hidden");
}

function showError() {
    document.getElementById("weather-info").classList.add("hidden");
    document.getElementById("error-message").classList.remove("hidden");
}

// Export functions for testing
module.exports = { fetchWeatherData, displayWeatherData, showError };
