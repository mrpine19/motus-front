import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./page/AuthContext";
import HomePage from "./page/HomePage";
import IntegrantesPage from "./page/IntegrantesPage";
import AboutPage from "./page/AboutPage";
import LoginPage from "./page/LoginPage";
import ContactPage from "./page/ContactPage";
import MainLayout from "./components/layout/MainLayout";
import RankingPage from "./page/RankingPage";
import SystemLayout from "./SystemLayout";
import DesafioPage from "./page/DesafioPage";
import DashboardMentorPage from "./page/DashboardMentorPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="integrantes" element={<IntegrantesPage />} />
            <Route path="sobre" element={<AboutPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="contato" element={<ContactPage />} />
          </Route>

          <Route path="/" element={<SystemLayout />}>
            <Route path="ranking" element={<RankingPage />} />
            <Route path="trilha" element={<DesafioPage />} />
            <Route path="dashboard/mentor" element={<DashboardMentorPage />} />
          </Route>

          <Route path="*" element={<div>Página não encontrada</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
