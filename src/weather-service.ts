import axios from "axios";
import { WeatherData } from "./types";

const API_URL = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min&timezone=Europe/Berlin";

export async function getWeather(): Promise<WeatherData> {
try{
    const response = await axios.get<{daily: WeatherData}>(API_URL);
    return response.data.daily;
}catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
}
};