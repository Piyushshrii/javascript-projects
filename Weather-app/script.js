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
        console.error("Error fetching weather data:", error);
        throw error;
    }
}

function displayWeatherData(data) {
    const { name, main, weather } = data;

    document.getElementById("city-name").textContent = name;
    document.getElementById("temperature").textContent = `Temperature: ${main.temp}°C`; // Fixed temp key
    document.getElementById("description").textContent = `Weather: ${weather[0].description}`;

    document.getElementById("weather-info").classList.remove("hidden");
    document.getElementById("error-message").classList.add("hidden");
}

function showError() {
    document.getElementById("weather-info").classList.add("hidden");
    document.getElementById("error-message").classList.remove("hidden");
}

// ✅ Attach event listener to button
document.getElementById("get-weather-btn").addEventListener("click", async () => {
    const city = document.getElementById("city-input").value.trim();

    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    try {
        const weatherData = await fetchWeatherData(city);
        displayWeatherData(weatherData);
    } catch (error) {
        showError();
    }
});
