import Searchbar from "./components/Searchbar";
import useWeather from "./hooks/useWeather";

const App = () => {
  const { weatherData, loading, error, fetchWeatherData, setCity } =
    useWeather();

  const handleSearch = (cityName) => {
    setCity(cityName);
    fetchWeatherData(cityName);
  };

  return (
    <div className=" bg-blue-50 h-screen w-full flex items-center justify-center">
      <div className="max-w-md mx-auto">
        <Searchbar onSearch={handleSearch} />

        {loading && (
          <p className="text-gray-500 font-semibold">Loading weather data...</p>
        )}
        {error && <p className="text-red-500">{error}</p>}

        {weatherData && (
          <div className="bg-white rounded-lg shadow p-6 mt-6 text-gray-800">
            <h2 className="text-2xl font-bold mb-2">
              {weatherData.city}, {weatherData.country}
            </h2>
            <div className="flex items-center space-x-4">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                alt={weatherData.description}
              />
              <div>
                <p className="text-xl">
                  {weatherData.temperature}°C{" "}
                  <span className="text-sm text-gray-500">
                    (Feels like {weatherData.feelsLike}°C)
                  </span>
                </p>
                <p>
                  {weatherData.condition} – {weatherData.description}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-1 text-sm">
              <p>💨 Wind Speed: {weatherData.windSpeed} m/s</p>
              <p>💧 Humidity: {weatherData.humidity}%</p>
              <p>☁️ Cloud Cover: {weatherData.clouds}%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
