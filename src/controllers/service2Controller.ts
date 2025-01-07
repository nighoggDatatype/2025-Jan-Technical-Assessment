import { WeatherData, AreaMetadata } from "../interfaces/weatherAPI.js"

const defaultLocation: AreaMetadata = {
    name: "Singapore",
    label_location: {
        longitude: 103.8545510172844,
        latitude: 1.2867888749929002
    }
}

let weatherCache: null | WeatherData = null;
export const getWeatherJson = async (): Promise<null | WeatherData> => {
    if (
        weatherCache === null ||
        new Date(weatherCache.items[0].valid_period.end) <= new Date()) { // Check if the forecast is outdated
        const url = "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            weatherCache = (await response.json()) as WeatherData;
        } catch (error: any) {
            console.error(error.message);
        }
    }
    return weatherCache
}

export const getWeatherLocation = async (): Promise<AreaMetadata[]> => {
    const data = await getWeatherJson()
    if (data == null) {
        return [defaultLocation]
    } else {
        return data.area_metadata
    }
}