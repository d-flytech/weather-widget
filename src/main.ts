import { getWeather } from "./services/weather-service.js";
import { getWeatherIcon, formatDate } from "./utils/utils.js";
import { cities } from "./utils/city-data.js";

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("location") as HTMLSelectElement;

  select.innerHTML = cities.map(city => `<option value="${city.lat},${city.lon}">${city.name}</option>`)
  .join(""); 

  const { lat, lon }: { lat: number; lon: number } = cities[0];
  renderDiv(lat,lon);

select.addEventListener("change", () => {
  const [lat, lon] = select.value.split(",").map(Number);
  renderDiv(lat, lon);
 });

});


async function renderDiv(lat:number, lon:number) {
  const weatherDiv = document.getElementById("weather");
  if (!weatherDiv) return;

  try {
    const data = await getWeather(lat, lon);

    weatherDiv.innerHTML = `
      <div class="weather-container">
        ${data.time.map((time, i) => {
          const maxTemp = Math.round(data.temperature_2m_max[i]);
          const minTemp = Math.round(data.temperature_2m_min[i]);
          const iconName = getWeatherIcon(data.weathercode[i]);
          const dateFormatted = formatDate(time);
          console.log("Weather code for: ", data.time[i], "is", data.weathercode[i]); //checking weathercode daily in devtools
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


