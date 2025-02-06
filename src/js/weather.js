const API_KEY = import.meta.env.VITE_WEATHER_KEY; // 환경변수 가져오기

if (!API_KEY) {
    console.error("🚨 환경 변수 VITE_WEATHER_KEY가 설정되지 않았습니다!");
}

const baseUrl = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0";
const serviceKey = encodeURIComponent(API_KEY); // URL 인코딩 필요

export const getWeatherData = async (nx, ny) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0") + "00"; // 매시간 00분 기준

    // API 요청 URL 생성
    const requestUrl = `${baseUrl}/getVilageFcst?serviceKey=${serviceKey}&dataType=JSON&numOfRows=10&pageNo=1&base_date=${year}${month}${day}&base_time=${hours}&nx=${nx}&ny=${ny}`;

    // 1️⃣ API 요청 URL을 출력하여 브라우저에서 직접 테스트 가능
    console.log("✅ API 요청 URL:", requestUrl);

  try {
      const response = await fetch(requestUrl);
      if (!response.ok) {
          throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
      }
      const data = await response.json();
      console.log("✅ API 응답 데이터 전체:", data);
  } catch (error) {
      console.error("🚨 기상청 API 호출 오류:", error.message); // 간단한 오류 메시지
      console.error("🚨 전체 오류 객체:", error); // 상세 오류 객체
  }


        return data;
    } catch (error) {
        // 6️⃣ 오류 발생 시 상세 오류 메시지 출력
        console.error("🚨 기상청 API 호출 오류:", error.message);
        console.error("🚨 전체 오류:", error);
        return null;
    }
};
