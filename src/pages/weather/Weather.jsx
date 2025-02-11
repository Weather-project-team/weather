import Search from "./Search";
import WeatherInfo from "./WeatherInfo";
import { AiFillCaretDown } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Weather() {
    const [favorites, setFavorites] = useState(false);
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [nearestCity, setNearestCity] = useState(""); // 가장 가까운 도시
    const [weatherData, setWeatherData] = useState(null); // 날씨 정보

    // 📌 즐겨찾기 도시 리스트 (임시 데이터)
    const favoriteCities = ["서울", "대전", "대구", "부산", "광주"];

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

    // 📌 위치가 변경되면 가장 가까운 도시 & 날씨 정보 요청
    useEffect(() => {
        if (location.latitude && location.longitude) {
            const fetchNearestCityAndWeather = async () => {
                try {
                    // 📌 1. 가장 가까운 도시 찾기 요청
                    const cityResponse = await axios.get("http://localhost:8080/api/weather/nearest-city", {
                        params: {
                            lat: location.latitude,
                            lon: location.longitude
                        }
                    });
                    console.log(cityResponse.data)

                    const cityName = cityResponse.data.city;
                    setNearestCity(cityName);

                    // 📌 2. 날씨 정보 요청
                    const weatherResponse = await axios.get("http://localhost:8080/api/weather", {
                        params: { city: cityName }
                    });

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
            <WeatherInfo />

            {/* 📌 현재 위치 및 가장 가까운 도시 정보 표시 */}
            <div className="mt-4 p-3 bg-gray-100 rounded-lg shadow-md">
                <strong>위도:</strong> {location.latitude} / <strong>경도:</strong> {location.longitude}
                <p className="mt-2 text-blue-600 font-bold">가장 가까운 도시: {nearestCity}</p>
                {weatherData && (
                    <p className="mt-2">현재 온도: {weatherData.temp}°C / 날씨: {weatherData.description}</p>
                )}
            </div>

            {/* 📌 즐겨찾기 리스트 */}
            <div className="mt-5">
                <div
                    onClick={() => setFavorites(!favorites)}
                    className="flex items-center justify-center cursor-pointer text-center mt-5 p-1 bg-blue-400 text-white rounded-xl"
                >
                    <h1 className="mr-1">즐겨찾기 한 도시</h1>
                    <span className={`transform transition-transform duration-300 ${favorites ? "rotate-180" : "rotate-0"}`}>
                        <AiFillCaretDown />
                    </span>
                </div>

                {favorites && (
                    <ul className="mt-3 bg-gray-200 p-3 rounded-lg shadow-md animate-fade-in">
                        {favoriteCities.map((city, index) => (
                            <li key={index} className="p-2 border-b border-gray-400 last:border-none">{city}</li>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    );
}
