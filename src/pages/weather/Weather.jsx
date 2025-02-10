import Search from "./Search";
import WeatherInfo from "./WeatherInfo";
import { AiFillCaretDown } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Weather() {
    const [favorites, setFavorites] = useState(false);

     // 즐겨찾기 도시 리스트 (임시 더미 데이터)
     const favoriteCities = ["서울", "대전", "대구", "부산", "광주"];

     useEffect(() => {
        const fetchWeather = async () => {
          try {
            const response = await axios.get("http://localhost:8080/api/weather", {
              params: { city: "부산" }
            });
            console.log(response.data);
          } catch (err) {
            console.error("Error fetching weather data:", err);
          }
        };
        fetchWeather();
      }, []);

    return (
        <>
            <main>
                <Search />
                <WeatherInfo />
                
                <div className=" mt-5">
                    <div
                        onClick={() => setFavorites(!favorites)}
                        className="flex items-center justify-center cursor-pointer text-center mt-5 p-1 bg-blue-400 text-white rounded-xl">
                        <h1 className="mr-1">즐겨찾기 한 도시</h1>
                        <span className={`transform transition-transform duration-300 ${favorites ? "rotate-180" : "rotate-0"}`}>
                            <AiFillCaretDown />
                        </span>
                    </div>

                    {favorites ? (
                       <ul className="mt-3 bg-gray-200 p-3 rounded-lg shadow-md animate-fade-in">
                       {favoriteCities.map((city, index) => (
                           <li key={index} className="p-2 border-b border-gray-400 last:border-none">
                               {city}
                           </li>
                       ))}
                        </ul>
                    ) : null}
                    
                </div>
            </main>
        </>
    );
}
