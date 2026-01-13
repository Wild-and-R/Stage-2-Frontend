import { useEffect, useState } from "react";
import { fetchWeather } from "../api/weather";
import { useDebounce } from "../hooks/debounce";

export function WeatherApp() {
  const [cityInput, setCityInput] = useState("");
  const [weatherData, setWeatherData] = useState<{
    city: string;
    temperature: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedCityInput = useDebounce(cityInput, 1500);

  useEffect(() => {
    // If input is empty, show error and stop
    if (!debouncedCityInput.trim()) {
      setWeatherData(null);
      setLoading(false);
      setError("City name is required");
      return;
    }

    setError(null);
    setLoading(true);

    fetchWeather(debouncedCityInput)
      .then((data) => {
        setWeatherData(data);
      })
      .catch(() => {
        setError("Failed to fetch weather data");
        setWeatherData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debouncedCityInput]);

const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;

  // Allow only letters and spaces
  if (/^[a-zA-Z\s]*$/.test(value)) {
    setCityInput(value);
  if (error) setError(null); // Clear error on valid input
  }
};

  return (
    <>
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter city name"
        value={cityInput}
        onChange={handleOnChange}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading && <p>Loading...</p>}

      {weatherData && !loading && (
        <>
          <h2>{weatherData.city}</h2>
          <p>{weatherData.temperature}°C</p>
        </>
      )}
    </>
  );
}

