import { getWeather } from "./services/weather-service.js";
import { getWeatherIcon, formatDate } from "./utils/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  renderDiv();
});

async function renderDiv() {
  const weatherDiv = document.getElementById("weather");
  if (!weatherDiv) return;

  try {
    const data = await getWeather();

    weatherDiv.innerHTML = `
      <div class="weather-container">
        ${data.time.map((time, i) => {
          const maxTemp = Math.round(data.temperature_2m_max[i]);
          const minTemp = Math.round(data.temperature_2m_min[i]);
          const iconName = getWeatherIcon(maxTemp, minTemp);
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
        }).join("")}
      </div>
    `;
  } catch (error) {
    console.error("Error rendering weather data:", error);
    weatherDiv.innerHTML = "<p>Failed to load weather data. Please try again later.</p>";
  }
};


