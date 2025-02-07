import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="w-full sm:w-full md:max-w-[600px] mx-auto min-h-screen px-4 bg-gray-100">
      <Outlet />
    </div>
  );
}
