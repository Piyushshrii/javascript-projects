/**
 * @jest-environment jsdom
 */

const { fetchWeatherData, displayWeatherData, showError } = require("./script"); // Fix import

describe("Weather App", () => {
    beforeEach(() => {
        // Set up basic DOM structure
        document.body.innerHTML = `
            <input id="city-input" value="London" />
            <button id="get-weather-btn"></button>
            <div id="weather-info" class="hidden">
                <h2 id="city-name"></h2>
                <p id="temperature"></p>
                <p id="description"></p>
            </div>
            <div id="error-message" class="hidden">Error</div>
        `;
    });

    test("fetchWeatherData returns weather data for a valid city", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    name: "London",
                    main: { temp: 25 },  // ✅ Use `temp` instead of `temp_max`
                    weather: [{ description: "clear sky" }]
                })
            })
        );

        const data = await fetchWeatherData("London");

        expect(data.name).toBe("London");
        expect(data.main.temp).toBe(25);  // ✅ Use `temp`
        expect(data.weather[0].description).toBe("clear sky");
    });

    test("fetchWeatherData throws an error for an invalid city", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false
            })
        );

        await expect(fetchWeatherData("InvalidCity")).rejects.toThrow("City not found");
    });

    test("displayWeatherData updates the DOM correctly", () => {
        const weatherData = {
            name: "London",
            main: { temp: 20 },  // ✅ Use `temp`
            weather: [{ description: "cloudy" }]
        };

        displayWeatherData(weatherData);

        expect(document.getElementById("city-name").textContent).toBe("London");
        expect(document.getElementById("temperature").textContent).toBe("Temperature: 20°C"); // ✅ Match UI update
        expect(document.getElementById("description").textContent).toBe("Weather: cloudy");
        expect(document.getElementById("weather-info").classList.contains("hidden")).toBe(false);
        expect(document.getElementById("error-message").classList.contains("hidden")).toBe(true);
    });

    test("showError hides weather info and displays error message", () => {
        showError();

        expect(document.getElementById("weather-info").classList.contains("hidden")).toBe(true);
        expect(document.getElementById("error-message").classList.contains("hidden")).toBe(false);
    });
});
