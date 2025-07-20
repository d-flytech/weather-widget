import type { WeatherData } from "./types/types.js";
import { getWeather } from "./services/weather-service.js";
import { getWeatherIcon, formatDate } from "./utils/utils.js";
import { cities } from "./utils/city-data.js";

document.addEventListener("DOMContentLoaded", async () => {
  const select = document.getElementById("location") as HTMLSelectElement;

  select.innerHTML = `
    <option value="current">Use my location</option>
    ${cities
      .map(
        (city) =>
          `<option value="${city.lat},${city.lon}">${city.name}</option>`
      )
      .join("")}
  `;

  select.value = "current";
  await renderLocation();

  select.addEventListener("change", async () => {
    if (select.value === "current") {
      await renderLocation();
    } else {
      const [lat, lon] = select.value.split(",").map(Number);
      console.log("City selected:", lat, lon);
      await renderLocation(lat, lon);
    }
  });

  async function renderLocation(lat?: number, lon?: number): Promise<void> {
    if (lat !== undefined && lon !== undefined) {
      console.log("Rendering provided location:", lat, lon);
      await renderWeatherWidget(lat, lon);
      return;
    }

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      const fallbackCity = cities[0];
      await renderWeatherWidget(fallbackCity.lat, fallbackCity.lon);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log("Geolocation coords:", lat, lon);
        await renderWeatherWidget(lat, lon);
      },
      async (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to retrieve your location. Please select a city.");
        const fallbackCity = cities[0];
        console.log("Fallback coords:", fallbackCity.lat, fallbackCity.lon);
        await renderWeatherWidget(fallbackCity.lat, fallbackCity.lon);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }
});

async function renderWeatherWidget(lat: number, lon: number): Promise<void> {
  const weatherDiv = document.getElementById("weather");
  if (!weatherDiv) return;

  try {
    const data: WeatherData = await getWeather(lat, lon);

    weatherDiv.innerHTML = `
      <div class="weather-container">
        ${data.time
          .map((time, i) => {
            const maxTemp = Math.round(data.temperature_2m_max[i]);
            const minTemp = Math.round(data.temperature_2m_min[i]);
            const iconName = getWeatherIcon(data.weathercode[i]);
            console.log(
              `Weather code: ${data.weathercode[i]} → icon: ${iconName}`
            );
            const dateFormatted = formatDate(time);
            return `
              <div class="weather-day">
                <div class="weather-date">${dateFormatted}</div>
                <img src="images/${iconName}.ico" alt="${iconName}" class="weather-icon" />
                <div class="weather-info">
                  <div>Max: ${maxTemp}°C</div>
                  <div>Min: ${minTemp}°C</div>
                </div>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  } catch (error) {
    console.error("Error rendering weather data:", error);
    weatherDiv.innerHTML =
      "<p>Failed to load weather data. Please try again later.</p>";
  }
}
