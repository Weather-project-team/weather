import axios from "axios";
import { useRecoilState } from "recoil";
import { FavoriteCitis } from "../../atoms/Atoms";

export default function WeatherInfo({ weatherData, deleteBtn }) {
  const [favoriteCities, setFavoriteCities] = useRecoilState(FavoriteCitis);

  if (!weatherData) {
    return <p>날씨 정보를 불러오는 중...</p>; // weatherData가 없을 때 처리
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
    <div className="flex items-center justify-around mt-15">
      <img
        className="w-[150px] h-[150px] rounded-lg bg-amber-300"
        src="https://via.placeholder.com/300x300"
        alt="날씨 이미지"
      />
      <div className="">
        <h2 className="text-lg font-bold">{weatherData.city}</h2>
        <p>{weatherData.weather.skyCondition}</p>
        <p>온도: {weatherData.weather.temperature}</p>
        <p>강수 : {weatherData.weather.precipitationType}</p>
      </div>
      {deleteBtn ? <button onClick={deleteButton}>삭제</button> : null}
    </div>
  );
}
