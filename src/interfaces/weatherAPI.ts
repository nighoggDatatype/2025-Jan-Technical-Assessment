export type  ApiResponse = {
    code: number;
    errorMsg: string | null;
    data: WeatherData;
};

export type WeatherData = {
    area_metadata: AreaMetadata[];
    items: Item[];
    paginationToken?: string;
};

export type AreaMetadata = {
    name: string;
    label_location: LabelLocation;
};

export type LabelLocation = {
    latitude: number;
    longitude: number;
};

export type Item = {
    updated_timestamp: string;
    timestamp: string;
    valid_period: ValidPeriod;
    forecasts: Forecast[];
};

export type ValidPeriod = {
    start: string;
    end: string;
    text: string;
};

export type Forecast = {
    area: string;
    forecast: ForecastType;
};

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