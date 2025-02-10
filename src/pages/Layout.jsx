import { Outlet } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

export default function Layout() {
  return (
    <div className="w-full sm:w-full md:max-w-[600px] mx-auto min-h-screen px-4 bg-sky-100">
      <header>
                      <nav className="flex font-bold items-center justify-between h-16">
                          <h1 className="text-lg">오늘의 날씨</h1>
                          <span><AiOutlineMenu /></span>
                      </nav>
                  </header>
      <Outlet />
    </div>
  );
}
