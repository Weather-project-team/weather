import { Outlet, useLocation } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";

export default function Layout() {
  const location = useLocation(); // ✅ 현재 URL 정보 가져오기
  const [path, setPath] = useState(location.pathname);

  useEffect(() => {
    setPath(location.pathname); // ✅ 경로 변경 시 상태 업데이트
  }, [location]); // ✅ location이 변경될 때만 실행

  const logout = () => {
    window.location.href = "http://localhost:8080/logout";
  };

  return (
    <div className="w-full sm:w-full md:max-w-[600px] mx-auto min-h-screen px-4 bg-sky-100">
      <header>
        <nav className="flex font-bold items-center justify-between h-16">
          <h1 className="text-lg">오늘의 날씨</h1>
          <span onClick={logout} className="cursor-pointer">
            {path === "/weather" ? "로그아웃" : <AiOutlineMenu />}
          </span>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
