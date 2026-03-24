import { Outlet } from "react-router";
import AppNavbar from "../AppNavbar/AppNavbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] dark:bg-[#18191A] text-black dark:text-white transition-colors flex flex-col">
      <AppNavbar />
      <main className="flex-grow overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
