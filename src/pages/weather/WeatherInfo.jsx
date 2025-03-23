import axios from "axios";
import { useRecoilState } from "recoil";
import { FavoriteCitis } from "../../atoms/Atoms";
import cloudy from "../../assets/img_cloudy.jpeg";
import cold from "../../assets/img_cold.jpeg";
import fall from "../../assets/img_fall.jpeg";
import nice from "../../assets/img_nice.jpeg";
import rain from "../../assets/img_rain.jpeg";
import sandy from "../../assets/img_sandy.jpeg";
import snowing from "../../assets/img_snowing.jpeg";
import storm from "../../assets/img_storm.jpeg";
import sunny from "../../assets/img_sunny.jpeg";
import wind from "../../assets/img_wind.jpeg";

export default function WeatherInfo({ weatherData, deleteBtn }) {
  const [favoriteCities, setFavoriteCities] = useRecoilState(FavoriteCitis);

  if (!weatherData) {
    return <p>날씨 정보를 불러오는 중...</p>; // weatherData가 없을 때 처리
  }
// 🌤️ 날씨 상태별 이미지 매핑
  const weatherImages = {
    "맑음": sunny,
    "구름많음": cloudy,
    "흐림": cloudy,
    "비": rain,
    "비/눈": snowing,
    "눈": snowing,
    "소나기": storm,
    // 아래부터는 이미지만 있음
    "바람": wind,
    "모래폭풍": sandy,
    "쌀쌀함": cold,
    "가을": fall,
    "쾌적함": nice,
  };

  // 🌤️ 현재 날씨 상태 가져오기
  const skyCondition = weatherData.weather.skyCondition || "알 수 없음";
  const precipitationType = weatherData.weather.precipitationType || "강수 없음";

  // 🌤️ 현재 날씨 상태에 맞는 배경 이미지 선택
  let backgroundImage;
  if (precipitationType !== "강수 없음") {
    backgroundImage = weatherImages[precipitationType] || rain;
  } else {
    backgroundImage = weatherImages[skyCondition] || sunny;
  }

  const deleteButton = async () => {
    try {
      await axios
        .delete("http://localhost:8080/api/bookmarks", {
          data: { location: weatherData.city },
          withCredentials: true,
        })
        .then(() => {
          setFavoriteCities(
            favoriteCities.filter((city) => city.city !== weatherData.city)
          );
        });
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };
  return (
    <div className="flex flex-col items-end justify-start h-[40vh] mt-15 bg-cover bg-center relative"
    style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="bg-blue-500/20 backdrop-blur-sm p-4 rounded-2xl text-white shadow-lg">
        <h2 className="text-lg font-bold">{weatherData.city}</h2>
        <p>{weatherData.weather.skyCondition}</p>
        <p>온도 : {weatherData.weather.temperature}</p>
        <p>강수 : {weatherData.weather.precipitationType}</p>
      </div>
      {deleteBtn ? <button onClick={deleteButton} className="absolute bottom-[5%] right-[5%] cursor-pointer text-lg">삭제</button> : null}
    </div>
  );
}
