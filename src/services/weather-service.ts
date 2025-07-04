import axios from "axios";
import { WeatherData } from "../types/types";

export async function getWeather(latitude:number, longitude:number): Promise<WeatherData> {
const API_URL =
  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Europe/Amsterdam`;


try{
    const response = await axios.get<{daily: WeatherData}>(API_URL);
    return response.data.daily;
}catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
}
};