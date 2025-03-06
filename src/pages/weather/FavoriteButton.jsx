import axios from "axios";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export function FavoriteButton({ city, favoriteCities, setFavoriteCities }) {
  // ✅ 현재 도시가 즐겨찾기 목록에 있는지 확인
  const isFavorite = favoriteCities.some((fav) => fav.city === city);

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        // ✅ 즐겨찾기 삭제 (DELETE)
        await axios.delete("http://localhost:8080/api/bookmarks", {
          data: { location: city },
          withCredentials: true,
        });

        // ✅ UI에서 즉시 반영 (favoriteCities 상태 업데이트)
        setFavoriteCities((prev) => prev.filter((fav) => fav.city !== city));
      } else {
        // ✅ 날씨 정보 가져오기
        const weatherResponse = await axios.get(
          "http://localhost:8080/api/weather",
          {
            params: { city },
          }
        );

        // ✅ 즐겨찾기 추가 (POST)
        await axios.post(
          "http://localhost:8080/api/bookmarks",
          { location: city },
          { withCredentials: true }
        );

        // ✅ UI에서 즉시 반영 (favoriteCities 상태 업데이트)
        setFavoriteCities((prev) => [
          ...prev,
          { city, weather: weatherResponse.data }, // ✅ 날씨 정보 포함하여 저장
        ]);
      }
    } catch (error) {
      console.error("즐겨찾기 변경 실패:", error);
    }
  };

  console.log(favoriteCities); // ✅ 디버깅용 로그

  return (
    <p
      className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer p-2 text-2xl"
      onClick={handleFavorite}
    >
      {isFavorite ? (
        <AiFillStar className="text-yellow-500" />
      ) : (
        <AiOutlineStar />
      )}
    </p>
  );
}
