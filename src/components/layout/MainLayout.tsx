import { Outlet } from "react-router-dom";
import Header from "./Header";

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <Header />
      <main className="grow py-8">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-center p-4 text-gray-400">
        Motus.IA © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default MainLayout;
