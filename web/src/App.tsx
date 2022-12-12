import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroPage from "./pages/CadastroPage";
import EscolhaPage from "./pages/EscolhaPage";
import LoginPage from "./pages/LoginPage";
import UsuarioPage from "./pages/UsuarioPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/usuario" element={<UsuarioPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/escolha" element={<EscolhaPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
