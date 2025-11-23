import { Outlet } from "react-router-dom";
import Header from "./Header";

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#38b7ff] text-gray-800">
      <Header />
      <main className="grow py-8">
        <Outlet />
      </main>
      <footer className="bg-blue-400 text-center p-4 text-gray-800">
        Motus.IA © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default MainLayout;
