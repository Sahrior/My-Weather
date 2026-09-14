import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getWeather } from "../services/get-weather";

const Weather = () => {
  const value = useLocation();
  const place = value.state.location;
  // console.log(place);
  const [weather, setWeather] = useState(null);
  // console.log("Weather",weather);
  useEffect(() => {
    if (!place) {
      return;
    }
    const fetchWeather = async () => {
      try {
        const result = await getWeather(place);
        // console.log(result);
        setWeather(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWeather();
  }, [place]);

  const Rain = ["drizzle", "rain", "freezing_rain"];

  function getRecommandations(weather) {
    if (!weather) return null;

    // 1. Weather you need to prepare for.
    if (weather.condition === "snow") {
      return {
        type: "snow",
        label: "Snow Alert",
        text: "It's snowing. Wear warm clothes and take it slow outside.",
      };
    }
    if (Rain.includes(weather.condition)) {
      return {
        type: "rain",
        label: "Rain Alert",
        text: "It's raining. Don't forget to take an umbrella with you.",
      };
    }
    if (weather.condition === "fog") {
      return {
        type: "fog",
        label: "Fog Alert",
        text: "It's foggy. Drive carefully and keep some distance from other vehicles.",
      };
    }

    // 2. Temperatures worth warning about (in °C).
    if (weather.temperature >= 32) {
      return {
        type: "hot",
        label: "Hot Day",
        text: "It's quite hot today. Take a water bottle with you.",
      };
    }
    if (weather.temperature <= 15) {
      return {
        type: "cold",
        label: "Cold Day",
        text: "It's cold today. Wear warm clothes before heading out.",
      };
    }
    if (weather.temperature >= 28) {
      return {
        type: "warm",
        label: "Warm Day",
        text: "It's warm today. Take some water with you.",
      };
    }

    // 3. Comfortable temperature, so just describe the sky.
    if (weather.condition === "clear") {
      return {
        type: "sunny",
        label: "Sunny Day",
        text: "Sunny skies ahead. Take water and consider carrying sunglasses.",
      };
    }
    if (
      weather.condition === "partly_cloudy" ||
      weather.condition === "cloudy"
    ) {
      return {
        type: "cloudy",
        label: "Cloudy Day",
        text: "Mostly cloudy today. A light jacket might come in handy.",
      };
    }

    // 4. Nothing special to report.
    return {
      type: "pleasant",
      label: "Perfect Day",
      text: "The weather looks comfortable today. Enjoy your day!",
    };
  }

  return (
    <div className="min-h-screen w-full bg-blue-50/40 text-slate-800 p-6 sm:p-10 flex flex-col font-sans antialiased">
      <div className="w-full flex-1 grid md:grid-cols-2 gap-6">
        {/* Left Column Stack */}
        <div className="flex flex-col gap-6">
          {/* Main Weather Card */}
          <div className="bg-white border border-blue-100 rounded-3xl p-8 sm:p-10 shadow-sm flex-1 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-blue-200">
            <div className="space-y-6">
              <div>
                <h1 className="text-xs uppercase tracking-widest text-blue-600 font-bold mb-3">
                  Today's Weather Details
                </h1>
                <div className="flex items-center gap-2.5 text-slate-900">
                  <MapPin className="text-blue-600 shrink-0" size={28} />
                  <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-blue-950">
                    {place?.name}
                  </h2>
                </div>
              </div>

              <div className="flex items-baseline justify-between border-y border-blue-50 py-8 my-4">
                <h3 className="text-6xl sm:text-8xl font-extralight tracking-tight text-blue-950">
                  {weather?.temperature}
                  <span className="text-3xl text-blue-500 font-normal ml-1">
                    °C
                  </span>
                </h3>
                <p className="text-xl sm:text-2xl font-light text-blue-600/90 capitalize">
                  {weather?.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="bg-blue-50/50 border border-blue-100/60 rounded-2xl p-4 text-center">
                <h3 className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-2">
                  Feels Like
                </h3>
                <p className="text-xl sm:text-2xl font-bold text-blue-950">
                  {weather?.feelsLike}
                </p>
              </div>
              <div className="bg-blue-50/50 border border-blue-100/60 rounded-2xl p-4 text-center">
                <h3 className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-2">
                  Humidity
                </h3>
                <p className="text-xl sm:text-2xl font-bold text-blue-950">
                  {weather?.humidity}
                </p>
              </div>
              <div className="bg-blue-50/50 border border-blue-100/60 rounded-2xl p-4 text-center">
                <h3 className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-2">
                  Wind Speed
                </h3>
                <p className="text-xl sm:text-2xl font-bold text-blue-950">
                  {weather?.windSpeed}
                </p>
              </div>
            </div>
          </div>

          {/* Recommendations Card */}
          <div className="bg-white border border-blue-100 rounded-3xl p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-200">
            <h2 className="text-xs uppercase tracking-widest text-blue-600 font-bold mb-3">
              Smart Recommendations
            </h2>

            <div className="text-base text-slate-600 leading-relaxed font-normal">
              {getRecommandations(weather)?.text}
            </div>
          </div>
        </div>

        {/* Right Column / Live Weather Box (Gradient Accent Card) */}
        <div className="bg-gradient-to-b from-blue-600 to-blue-700 text-white border border-blue-500 rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col items-center justify-between min-h-[350px] md:min-h-full transition-all duration-300">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-blue-100 font-semibold text-center">
              Live in {place?.name}
            </h2>
          </div>

          <div className="flex items-center justify-center my-auto text-center py-10">
            <p className="text-4xl sm:text-6xl font-light capitalize tracking-tight text-white drop-shadow-sm">
              {weather?.description}
            </p>
          </div>

          <div className="flex items-center justify-center">
            <span className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm sm:text-base px-8 py-3 tracking-wide">
              Feels Like : {weather?.feelsLike}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;