import axios from "axios";
import { useEffect, useState } from "react";
import { FavoriteButton } from "./FavoriteButton";

export default function Search() {
  const [search, setSearch] = useState("");

  const [filterCity, setFilterCity] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search) {
      setFilterCity([]);
      return;
    }

    const fetchCities = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/api/weather/cities",
          {
            params: { query: search },
          }
        );
        setFilterCity(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const timer = setTimeout(() => {
      fetchCities();
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  console.log(filterCity);

  return (
    <div>
      <input
        value={search}
        type="text"
        placeholder="지역을 검색하세요"
        className="w-full p-2 border-2 border-sky-400 rounded-lg"
        onChange={(e) => setSearch(e.target.value)}
      />

      {filterCity.length > 0 ? (
        <ul className="bg-gray-300 mt-2 rounded-lg">
          {filterCity.slice(0, 4).map(
            (
              city // 🔥 4개만 가져오기
            ) => (
              <li key={city} className="p-5 flex relative">
                <img
                  src={city ? null : null}
                  alt="날씨"
                  className="w-[50px] h-[50px] bg-amber-300 rounded-full"
                />
                <h1>{city}</h1>
                <FavoriteButton city={city} />
              </li>
            )
          )}
        </ul>
      ) : (
        !loading &&
        search.length > 0 && (
          <p className="mt-2 text-gray-600">검색 결과 없음</p>
        )
      )}
    </div>
  );
}
