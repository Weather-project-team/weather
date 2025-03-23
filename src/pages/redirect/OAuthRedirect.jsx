import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OAuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://116.34.191.73:8090/api/user/me",
          { withCredentials: true }
        );
        const user = response.data;

        if (user) {
          console.log("로그인 성공:", user);
          localStorage.setItem("user", JSON.stringify(user)); // ✅ 로컬스토리지에 저장
          navigate("/weather"); // ✅ 로그인 후 이동할 페이지
        }
      } catch (error) {
        console.error("사용자 정보를 가져올 수 없습니다:", error);
        navigate("/"); // ✅ 로그인 실패 시 다시 로그인 페이지로 이동
      }
    };

    fetchUser();
  }, [navigate]);

  return <p>로그인 처리 중...</p>;
}
