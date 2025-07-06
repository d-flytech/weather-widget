export interface WeatherData {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
};

export interface CityOption {
    name: string;
    lat: number;
    lon: number;
};