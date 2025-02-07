export default function WeatherInfo() {

    return(
        <div className="flex items-center justify-around mt-15">
                    <img className="w-[150px] h-[150px] rounded-lg bg-amber-300" src="https://via.placeholder.com/300x300" alt="날씨 이미지" />
                    <div className="">
                        <h2 className="text-lg font-bold">서울</h2>
                        <p>맑음</p>
                        <p>온도: 20도</p>
                        <p>습도: 50%</p>
                    </div>
                </div>
    )
}