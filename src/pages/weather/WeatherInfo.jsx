export default function WeatherInfo({weatherData}) {

    if (!weatherData) {
        return <p>날씨 정보를 불러오는 중...</p>; // weatherData가 없을 때 처리
      }
    return(
        <div className="flex items-center justify-around mt-15">
                    <img className="w-[150px] h-[150px] rounded-lg bg-amber-300" src="https://via.placeholder.com/300x300" alt="날씨 이미지" />
                    <div className="">
                        <h2 className="text-lg font-bold">{weatherData.city}</h2>
                        <p>{weatherData.weather.skyCondition}</p>
                        <p>온도: {weatherData.weather.temperature}</p>
                        <p>강수 : {weatherData.weather.precipitationType}</p>
                    </div>
                </div>
    )
}