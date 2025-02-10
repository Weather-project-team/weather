import { useState } from "react";
import { AiOutlineStar } from "react-icons/ai";

export default function Search() {
    
    const weather = [
        { id: 1, name: "서울", temperature: "15°C", weather: "맑음" },
        { id: 2, name: "대전", temperature: "18°C", weather: "구름 많음" },
        { id: 3, name: "대구", temperature: "20°C", weather: "흐림" },
        { id: 4, name: "부산", temperature: "22°C", weather: "비" },
        { id: 5, name: "광주", temperature: "19°C", weather: "맑음" },
        { id: 6, name: "울산", temperature: "21°C", weather: "구름 조금" },
        { id: 7, name: "인천", temperature: "16°C", weather: "흐림" },
        { id: 8, name: "제주", temperature: "23°C", weather: "비" },
    ];

    const [search, setSearch] = useState("");

    const [filterCity,setFilterCity] = useState([]);

    const handleInput = (e) => {
        const val = e.target.value;
        setSearch(val);

        if(val){
            const results = weather.filter(city => city.name.startsWith(val));
            setFilterCity(results);
        }else{
            setFilterCity([]);
        }
    }
    return (
        <div>
            <input
            value={search}
            type="text" 
            placeholder="지역을 검색하세요" 
            className="w-full p-2 border-2 border-sky-400 rounded-lg" 
            onChange={handleInput}/>

            {filterCity.length > 0 && (
                <ul className="bg-gray-300 mt-2 rounded-lg">
                    {filterCity.map(city => (
                        <li key={city.id} className
                        ="p-5 flex relative">
                            <img src="" alt="날씨" className="w-[50px] h-[50px] bg-amber-300 rounded-full"/>
                            <h1>{city.name}</h1>
                            <p>{city.temperature}</p>
                            <p>{city.weather}</p>
                            <p className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer p-2 text-2xl"><AiOutlineStar /></p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
