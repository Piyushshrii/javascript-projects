document.addEventListener("DOMContentLoaded", () => {
    console.log("script.js loaded and DOM fully ready!");

    const API_KEY = "104f5799cdb9aa6f8cf921f45bae1e27"; 
    const button = document.getElementById("get-weather-btn");
    const input = document.getElementById("city-input");

    if (!button || !input) {
        console.error("Button or Input field not found!");
        return;
    }

    button.addEventListener("click", async () => {
        const city = input.value.trim();

        if (!city) {
            console.warn("City input is empty!");
            return;
        }

        try {
            console.log(`Fetching weather for: ${city}`);
            const data = await fetchWeatherData(city);
            console.log("Weather data received:", data);
            displayWeatherData(data);
        } catch (error) {
            console.error("Error fetching weather:", error);
            showError();
        }
    });
});

async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=104f5799cdb9aa6f8cf921f45bae1e27`;

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
    document.getElementById("temperature").textContent = `Temperature: ${main.temp}°C`;
    document.getElementById("description").textContent = `Weather: ${weather[0].description}`;

    document.getElementById("weather-info").classList.remove("hidden");
    document.getElementById("error-message").classList.add("hidden");
}

function showError() {
    document.getElementById("weather-info").classList.add("hidden");
    document.getElementById("error-message").classList.remove("hidden");
}

// ✅ Export only if running in Node.js (for testing)
if (typeof module !== "undefined" && module.exports) {
    module.exports = { fetchWeatherData, displayWeatherData, showError };
}
