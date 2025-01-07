export interface APIInfo {
    status: "healthy";
}

export interface LabelLocation {
    longitude: number;
    latitude: number;
}

export interface AreaMetadata {
    name: string;
    label_location: LabelLocation;
}

export interface ValidPeriod {
    start: string; // ISO 8601 date-time string
    end: string; // ISO 8601 date-time string
}

export type ForecastType =
      "Fair"
    | "Fair (Day)"
    | "Fair (Night)"
    | "Fair and Warm"
    | "Partly Cloudy"
    | "Partly Cloudy (Day)"
    | "Partly Cloudy (Night)"
    | "Cloudy"
    | "Hazy"
    | "Slightly Hazy"
    | "Windy"
    | "Mist"
    | "Fog"
    | "Light Rain"
    | "Moderate Rain"
    | "Heavy Rain"
    | "Passing Showers"
    | "Light Showers"
    | "Showers"
    | "Heavy Showers"
    | "Thundery Showers"
    | "Heavy Thundery Showers"
    | "Heavy Thundery Showers with Gusty Winds";

export interface Forecast {
    area: string;
    forecast: ForecastType;
}

export interface Item {
    update_timestamp: string; // ISO 8601 date-time string
    timestamp: string; // ISO 8601 date-time string
    valid_period: ValidPeriod;
    forecasts: Forecast[];
}

export interface WeatherData {
    api_info: APIInfo;
    area_metadata: AreaMetadata[];
    items: Item[];
}