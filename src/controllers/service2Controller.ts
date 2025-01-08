import { WeatherData, AreaMetadata } from "../interfaces/weatherAPI.js"
import { Request, Response } from 'express';

export const API_URL = "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast"

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
        const response = await fetch(API_URL);
        if (!response.ok) {
            return weatherCache
        }
        weatherCache = (await response.json()) as WeatherData;
    }
    return weatherCache
}
export const flushWeatherCache = () => {
    weatherCache = null
}

export const getWeatherLocation = async (): Promise<AreaMetadata[]> => {
    const data = await getWeatherJson()
    if (data == null) {
        return [defaultLocation]
    } else {
        return data.area_metadata
    }
}

export const getWeatherForecast = async (location: string): Promise<string | null> => {
    const data = await getWeatherJson()
    if (data != null) {
        for (const forecasts of data.items[0].forecasts) {
            if (forecasts.area == location) {
                return forecasts.forecast
            }
        }
    }
    return null
}

interface GetLocalWeatherBody {
    location: string;
}

export const forecastService2 = async (req: Request<{}, {}, GetLocalWeatherBody>, res: Response): Promise<void> => {
    const { location } = req.body;

    if (!location || typeof location !== 'string') {
        res.send(`
            <div class="alert alert-danger" role="alert">
                Unable to provide forecast
            </div>
          `);
        return;
    }
    const forecast = await getWeatherForecast(location)
    if (forecast == null) {
        res.send(`
            <div class="alert alert-danger" role="alert">
                Unable to provide forecast
            </div>
          `);
        return;
    } else {
        res.send(`
            <div class="alert alert-info" role="alert">
                Forecast: ${forecast}
            </div>
          `);
    }
};