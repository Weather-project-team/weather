const API_KEY = "nui8VchWTyGovFXIVi8hjQ"; // 발급받은 기상청 API 키
const baseUrl = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0";
const serviceKey = encodeURIComponent(API_KEY); // URL 인코딩 필요

export const getWeatherData = async (nx, ny) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0") + "00"; // 매시간 00분 기준

  const requestUrl = `${baseUrl}/getVilageFcst?serviceKey=${serviceKey}&dataType=JSON&numOfRows=10&pageNo=1&base_date=${year}${month}${day}&base_time=${hours}&nx=${nx}&ny=${ny}`;

  try {
    const response = await fetch(requestUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("기상청 API 호출 오류:", error);
    return null;
  }
};
