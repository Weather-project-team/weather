import axios from "axios";
import { useEffect, useState } from "react";
import { FavoriteButton } from "./FavoriteButton";
import { FavoriteCitis } from "../../atoms/Atoms";
import { useRecoilState } from "recoil";

export default function Search() {
  const [search, setSearch] = useState("");
  const [filterCity, setFilterCity] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Recoil을 이용한 즐겨찾기 관리
  const [favoriteCities, setFavoriteCities] = useRecoilState(FavoriteCitis);

  // ✅ 애플리케이션이 처음 로드될 때 DB에서 즐겨찾기 목록 가져오기
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/bookmarks", {
          withCredentials: true,
        });

        setFavoriteCities(res.data); // ✅ 최신 즐겨찾기 목록을 Recoil 상태로 설정
      } catch (error) {
        console.error("즐겨찾기 목록 불러오기 실패:", error);
      }
    };

    fetchFavorites(); // ✅ 초기 로드 시 실행
  }, []); // 🔥 빈 배열을 넣어 처음 마운트될 때만 실행

  // ✅ 검색 결과 가져오기
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
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchCities();
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

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
          {filterCity.slice(0, 4).map((city) => (
            <li key={city} className="p-5 flex relative">
              <img
                src={city ? null : null}
                alt="날씨"
                className="w-[50px] h-[50px] bg-amber-300 rounded-full"
              />
              <h1>{city}</h1>
              {/* ✅ 즐겨찾기 상태를 FavoriteButton에 전달 */}
              <FavoriteButton
                city={city}
                favoriteCities={favoriteCities}
                setFavoriteCities={setFavoriteCities}
              />
            </li>
          ))}
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
