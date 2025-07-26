import Searchbar from "./components/Searchbar";
import useWeather from "./hooks/useWeather";
import { motion, AnimatePresence } from "framer-motion";

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

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="spinner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-6"
            >
              <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
              <span className="ml-3 text-blue-600">Fetching weather...</span>
            </motion.div>
          )}
        </AnimatePresence>
        {error && <p className="text-red-500">{error}</p>}

        <AnimatePresence mode="wait">
          {!loading && weatherData && (
            <motion.div
              key={weatherData.city}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow p-6 text-gray-800 mt-6"
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
