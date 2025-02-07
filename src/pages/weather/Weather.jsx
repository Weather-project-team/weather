import Search from "./Search";
import WeatherInfo from "./WeatherInfo";
import { AiFillCaretDown, AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";

export default function Weather() {
    const [favorites, setFavorites] = useState(false);

     // 즐겨찾기 도시 리스트 (임시 더미 데이터)
     const favoriteCities = ["서울", "대전", "대구", "부산", "광주"];

    return (
        <>
            <header>
                <nav className="flex font-bold items-center justify-between h-16">
                    <h1 className="text-lg">오늘의 날씨</h1>
                    <span><AiOutlineMenu /></span>
                </nav>
            </header>

            <main>
                <Search />
                <WeatherInfo />
                
                <div className="border-t-2 border-gray-300 mt-5">
                    <div
                        onClick={() => setFavorites(!favorites)}
                        className="flex items-center justify-center cursor-pointer text-center mt-5 p-1 bg-gray-300 rounded-xl">
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
