import { useEffect, useState } from "react";

const useWeather = (defaultCity = "Dhaka") => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(defaultCity);

  const fetchWeatherData = async (cityName) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    if (!cityName) return;
    if (!apiKey) {
      console.warn("API key is not set");
      setError("API key is not set");
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData({});

    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeatherData({
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        condition: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        windSpeed: data.wind.speed,
        humidity: data.main.humidity,
        clouds: data.clouds.all,
      });
    } catch (err) {
      setError("Failed to fetch weather data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [city]);

  return {
    weatherData,
    loading,
    error,
    fetchWeatherData,
    setCity,
  };
};

export default useWeather;
