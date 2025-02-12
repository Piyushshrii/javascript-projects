document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name"); // Fix variable name
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "104f5799cdb9aa6f8cf921f45bae1e27"; 

    getWeatherBtn.addEventListener("click", async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        try {
            const weatherData = await fetchWeatherData(city); 
            displayWeatherData(weatherData);
        } catch (error) {
            console.error(error); // Log error for debugging
            showError();
        }
    });

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`; // Use HTTPS

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("City not found");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    function displayWeatherData(data) {
        console.log(data);
        const { name, main, weather } = data;

        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature: ${main.temp_max}°C`;
        descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

        // Unlock the display
        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    }

    function showError() {
        weatherInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }
});
