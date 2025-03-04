import Search from "./Search";
import WeatherInfo from "./WeatherInfo";
import { AiFillCaretDown } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { FavoriteCitis } from "../../atoms/Atoms";

export default function Weather() {
  const [favorites, setFavorites] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [nearestCity, setNearestCity] = useState(""); // 가장 가까운 도시
  const [weatherData, setWeatherData] = useState(null); // 날씨 정보

  const [favoriteCities, setFavoriteCities] = useRecoilState(FavoriteCitis);
  const userId = JSON.parse(localStorage.getItem("user"))?.id || null;

  console.log(userId);

  // 📌 현재 위치 가져오기 (useEffect 실행 시 한 번만 호출)
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => console.error("위치 정보를 가져올 수 없습니다:", error)
      );
    }
  }, []);

  useEffect(() => {
    const fetchFavoriteCities = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/list/${userId}`
        );
        console.log(response);
        setFavoriteCities(response.data);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };
    fetchFavoriteCities();
  }, [favoriteCities]);

  // 📌 위치가 변경되면 가장 가까운 도시 & 날씨 정보 요청
  useEffect(() => {
    if (location.latitude && location.longitude) {
      const fetchNearestCityAndWeather = async () => {
        try {
          // 📌 1. 가장 가까운 도시 찾기 요청
          const cityResponse = await axios.get(
            "http://localhost:8080/api/weather/nearest-city",
            {
              params: {
                lat: location.latitude,
                lon: location.longitude,
              },
            }
          );
          console.log(cityResponse.data);

          const cityName = cityResponse.data.city;
          setNearestCity(cityName);

          // 📌 2. 날씨 정보 요청
          const weatherResponse = await axios.get(
            "http://localhost:8080/api/weather",
            {
              params: { city: cityName },
            }
          );
          console.log(weatherResponse);

          setWeatherData(weatherResponse.data);
        } catch (error) {
          console.error("데이터 가져오기 실패:", error);
        }
      };

      fetchNearestCityAndWeather();
    }
  }, [location]); // 📌 `location` 변경될 때마다 실행

  return (
    <main>
      <Search />
      <WeatherInfo weatherData={weatherData} />

      {/* 📌 현재 위치 및 가장 가까운 도시 정보 표시 */}
      <div className="mt-4 p-3 bg-gray-100 rounded-lg shadow-md">
        <strong>오늘 날씨 매우 추우니 집에 박혀있으십시오.</strong>
      </div>

      {/* 📌 즐겨찾기 리스트 */}
      <div className="mt-5">
        <div
          onClick={() => setFavorites(!favorites)}
          className="flex items-center justify-center cursor-pointer text-center mt-5 p-1 bg-blue-400 text-white rounded-xl"
        >
          <h1 className="mr-1">즐겨찾기 한 도시</h1>
          <span
            className={`transform transition-transform duration-300 ${
              favorites ? "rotate-180" : "rotate-0"
            }`}
          >
            <AiFillCaretDown />
          </span>
        </div>

        {favorites && (
          <ul className="mt-3 bg-gray-200 p-3 rounded-lg shadow-md animate-fade-in">
            {favoriteCities.map((city, index) => (
              <li
                key={index}
                className="p-2 border-b border-gray-400 last:border-none"
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
